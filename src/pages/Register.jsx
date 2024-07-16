import {Link, useLocation} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {FaUser, FaUserSecret} from "react-icons/fa6";
import bcrypt from "bcryptjs";
import MySwal from "sweetalert2";

export default function Register() {
  const user = localStorage.getItem("user");
  const [accType, setAccType] = useState("normal");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username");
    const email = form.get("email");
    const phoneNumber = form.get("number");
    const pinCode = pin.join("");
    const hashedPinCode = await bcrypt.hash(pinCode, 10);

    const data = {
      username: username,
      email: email,
      phone: phoneNumber,
      pin: hashedPinCode,
      role: accType,
      verified: false,
    };

    console.log(data);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        MySwal.fire({
          position: "center",
          icon: "success",
          text: response.message || "Registration Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          position: "center",
          icon: "error",
          text: "Registration Failed!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <div className="min-h-screen hero bg-[#F3ECDA] animate__animated animate__slideInLeft">
        <div className="flex items-center justify-center w-full hero-content">
          <div className="w-full max-w-md border-2 border-green-500 shadow-2xl border-opacity-60 rounded-xs card bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <caption className="text-2xl font-bold text-green-500 uppercase">
                Register
              </caption>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  name="username"
                  className="rounded-xs input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  name="email"
                  className="rounded-xs input input-bordered"
                  required
                />
              </div>
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
                      className="w-full font-bold text-center rounded-xs input input-bordered"
                      required
                    />
                  ))}
                </div>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="flex items-center justify-center gap-1 label-text">
                    <FaUser></FaUser> Normal Account
                  </span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-green-500"
                    onClick={() => setAccType("normal")}
                    defaultChecked
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="flex items-center justify-center gap-1 label-text">
                    <FaUserSecret></FaUserSecret> Agent Account
                  </span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    onClick={() => setAccType("agent")}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover">
                    Already have an account?
                    <span className="text-green-600 underline"> Login</span>
                  </Link>
                </label>
                <button className="font-bold uppercase bg-green-500 hover:text-green-500 rounded-xs btn text-gray-950">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
