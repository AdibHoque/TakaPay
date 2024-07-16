import {Link, useLocation} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const user = localStorage.getItem("user");
  const [pin, setPin] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (user) {
      navigate(location?.state ? location?.state : "/");
    }
  }, [user, navigate]);

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      if (index < 5 && value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (pin[index]) {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const phoneNumber = form.get("number");
    const pinCode = pin.join("");
    console.log("Phone Number:", phoneNumber, "PIN:", pinCode);
  };

  return (
    <>
      <div className="min-h-screen hero bg-[#F3ECDA] animate__animated animate__slideInLeft">
        <div className="flex items-center justify-center w-full hero-content">
          <div className="w-full max-w-md border-2 border-green-500 shadow-2xl border-opacity-60 rounded-xs card bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <caption className="text-2xl font-bold text-green-500 uppercase">
                Login
              </caption>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  placeholder="Your 11 digit phone number"
                  name="number"
                  className="rounded-xs input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PIN</span>
                </label>
                <div className="flex justify-between gap-2">
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handlePinChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-full text-center rounded-xs input input-bordered"
                      required
                    />
                  ))}
                </div>
                <label className="label">
                  <Link
                    to="/register"
                    className="label-text-alt link link-hover"
                  >
                    Don&#39;t have an account?
                    <span className="text-green-600 underline"> Register</span>
                  </Link>
                </label>
              </div>
              <div className="mt-2 form-control">
                <button className="font-bold uppercase bg-green-500 hover:text-green-500 rounded-xs btn text-gray-950">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
