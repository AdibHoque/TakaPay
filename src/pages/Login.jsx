import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaEyeSlash, FaEye} from "react-icons/fa";

export default function Login() {
  const user = localStorage.getItem("user");
  const [showpass, setShowpass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location?.state ? location?.state : "/");
    }
  }, [user, navigate]);
  1;
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
  };
  return (
    <>
      <div className="min-h-screen hero bg-base-200 animate__animated animate__slideInLeft">
        <div className="flex items-center justify-center w-full hero-content">
          <div className="w-full max-w-md border-2 shadow-2xl border-primary rounded-xs card bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <caption className="text-2xl font-bold text-primary">
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
                <div className="flex items-center">
                  <input
                    type={showpass ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="w-full rounded-xs input input-bordered"
                    required
                  />
                  <span
                    onClick={() => setShowpass(!showpass)}
                    className="absolute text-xl right-12"
                  >
                    {showpass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </span>
                </div>

                <label className="label">
                  <Link
                    to="/register"
                    className="label-text-alt link link-hover"
                  >
                    Don&#39;t have an account?
                    <span className="text-blue-600 underline"> Register</span>
                  </Link>
                </label>
              </div>

              <div className="mt-2 form-control">
                <button className="font-bold hover:text-primary bg-primary rounded-xs btn text-gray-950 ">
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
