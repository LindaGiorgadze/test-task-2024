import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const newBookDetails = {
    title: "",
    genre: "",
    pageCount: null,
    progress: null
  };
  function addBook() {
    axios
      .post("http://localhost:3001/books", {
        title: newBookDetails.title,
        genre: newBookDetails.genre,
        pageCount: newBookDetails.pageCount,
        progress: newBookDetails.progress || 0
      })
      .then((data) => {
        console.log(data?.data);
        navigate(`/library/${data?.data?.id}`);
      })
      .catch(console.warn);
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-4 lg:px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add New Book
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            addBook();
          }}
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Book Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => (newBookDetails.title = e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Genre
            </label>
            <div className="mt-2">
              <input
                id="genre"
                name="genre"
                type="text"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => (newBookDetails.genre = e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="pageCount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Page Count
            </label>
            <div className="mt-2">
              <input
                id="pageCount"
                name="pageCount"
                type="number"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  (newBookDetails.pageCount = parseInt(e.target.value))
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="progress"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pages Read
            </label>
            <div className="mt-2">
              <input
                id="progress"
                name="progress"
                type="number"
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  (newBookDetails.progress = parseInt(e.target.value))
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
