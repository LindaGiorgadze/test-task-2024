import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target);
    axios.get("http://localhost:3001/users").then((users) => {
      axios
        .post("http://localhost:3001/login", {
          email,
          password
        })
        .then((data) => {
          const matchedUser = users?.data?.filter(
            (user) =>
              user.email === data?.data?.email &&
              user.password === data?.data?.password
          );
          if (matchedUser?.length > 0) {
            setUser(matchedUser);
            localStorage.setItem("isAuthorized", JSON.stringify(true));
            localStorage.setItem(
              "user",
              JSON.stringify({ name: matchedUser[0].name, email: matchedUser[0].email })
            );
          } else setUser([]);
          axios.delete(`http://localhost:3001/login/${data?.data?.id}`);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch(console.warn);
    });
  };

  console.log(user);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-4 lg:px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <button
              onClick={() => navigate("register")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
