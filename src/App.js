import React, { Suspense } from "react";
import "./App.scss";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Loading from "./components/Loading";

const Layout = React.lazy(() => import("./pages/Layout"));
const Homepage = React.lazy(() => import("./pages/Homepage"));
const Register = React.lazy(() => import("./pages/Register"));
const Library = React.lazy(() => import("./pages/Library"));
const LibraryInnerPage = React.lazy(() =>
  import("./pages/Library/LibraryInner")
);
const AddBook = React.lazy(() => import("./pages/AddBook"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:bookId" element={<LibraryInnerPage />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
