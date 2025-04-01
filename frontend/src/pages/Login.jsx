import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RoutesPathName } from "../constants.jsx";
import { useAuth } from "../utils/Auth.jsx";
import Dashboard from "./Dashboard.jsx";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, headers } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (data.jwtToken) {
        localStorage.setItem("jwtToken", data.jwtToken);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return authToken? ( <Dashboard />)
  :(
    <>
      <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a
                  href="#"
                  className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">
                    Login.
                  </span>
                </a>
              </div>
              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
                Welcome!
              </h4>
              <p className="mb-6 text-gray-500">Sign-in to access your account</p>
              <form className="mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Link to={RoutesPathName.CHANGE_PASSWORD} className="text-blue-500 hover:underline">
                      Change Password
                    </Link>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="password"
                      id="password"
                      className="relative block flex-auto rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      placeholder="············"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <button
                    className="grid w-full rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <button
                    className="bg-white w-full text-indigo-600 border border-indigo-600 px-5 py-2  shadow-md hover:bg-indigo-100 mt-4" // Adding margin-top here
                    onClick={() => navigate("/")} // Navigate to home page
                  >
                   Back Home
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;