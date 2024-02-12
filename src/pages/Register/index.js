import { SparklesIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const newUser = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    localStorage.getItem("isAuthorized")
      ? setIsAuthorized(true)
      : setIsAuthorized(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("isAuthorized")]);
  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);
  function addUser() {
    if (newUser.password !== newUser.confirmPassword) {
      setError("Password does not match. Try again.");
    } else
      axios
        .post("http://localhost:3001/users", newUser)
        .then((data) => {
          localStorage.setItem("isAuthorized", JSON.stringify(true));
          localStorage.setItem(
            "user",
            JSON.stringify({ name: data?.data?.name, email: data?.data?.email })
          );
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch(console.warn);
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-4 lg:px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            addUser();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => (newUser.email = e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name and surname
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => (newUser.name = e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Create Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => (newUser.password = e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Repeat Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  newUser.confirmPassword = e.target.value;
                  setError("");
                }}
              />
              {error && <span className="text-red-600">{error}</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
