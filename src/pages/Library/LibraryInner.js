import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LibraryInner = () => {
  let { bookId } = useParams();
  const [book, setBook] = useState({});
  const [review, setReview] = useState("");
  const [currentProgress, setCurrentProgress] = useState();

  useEffect(() => {
    axios(`http://localhost:3001/books/${bookId}`)
      .then((data) => {
        setBook(data?.data);
        setCurrentProgress(data?.data?.progress);
      })
      .catch(console.warn);
  }, [bookId]);
  const progress = book.progress / book.pageCount;

  function addReview(review) {
    const updatedBook = { ...book, review: review };
    console.log(updatedBook);

    axios
      .put(`http://localhost:3001/books/${bookId}`, updatedBook)
      .then((data) => setBook(data.data))
      .catch(console.warn);
  }

  function addProgress(progress) {
    const updatedBook = { ...book, progress: progress };

    axios
      .put(`http://localhost:3001/books/${bookId}`, updatedBook)
      .then((data) => setBook(data.data))
      .catch(console.warn);
  }
  return (
    <div className="h-[600px] w-[800px] mx-auto">
      <div className="aspect-h-1 aspect-w-1 w-full h-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <div className="book-cover h-full w-full object-cover object-contain group-hover:opacity-75">
          <div>
            <h1 className="text-lg">{book.title}</h1>
            <div class="separator"></div>
            <h2 className="text-lg">{book.genre?.toUpperCase()}</h2>
            <p className="mt-1 text-sm font-regular text-neutral-300">
              Pages: {book.pageCount}
            </p>
            {parseFloat(progress) === 1 ? (
              <p className="mt-1 text-sm font-regular text-green-500">
                Reading Done
              </p>
            ) : (
              <p className="mt-1 text-sm font-regular text-neutral-300">
                Reading progress:{" "}
                <span
                  className={`text-md font-medium ${
                    parseFloat(progress) < 0.33
                      ? "text-rose-500"
                      : parseFloat(progress) < 0.66
                      ? "text-orange-900"
                      : "text-green-500"
                  }`}
                >
                  {Math.round(progress * 100)}%
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      {progress !== 1 && (
        <div>
          <h4 className="mt-6 text-xl text-orange-700">
            Update your progress:
          </h4>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              currentProgress && addProgress(currentProgress);
            }}
          >
            <div>
              <label
                htmlFor="pages"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pages read
              </label>
              <div className="mt-2">
                <input
                  id="pages"
                  name="pages"
                  type="number"
                  autoComplete="off"
                  required
                  value={currentProgress}
                  onChange={(e) =>
                    e.target.value &&
                    setCurrentProgress(parseInt(e.target.value))
                  }
                  className="block w-[200px] mx-auto rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              className="mt-4 text-lg text-gray-900 bg-neutral-400 w-[200px] mx-auto rounded"
              type="submit"
            >
              Submit Progress
            </button>
          </form>
        </div>
      )}
      {progress === 1 && book.review ? (
        <div>
          <h4 className="mt-6 text-xl text-orange-700">Review:</h4>
          <p className="mt-4 text-lg text-neutral-500 italic">{book.review}</p>
        </div>
      ) : (
        progress === 1 &&
        !book.review && (
          <div>
            <h4 className="mt-6 text-xl text-orange-700">Add Review:</h4>
            <form className="flex flex-col">
              <textarea
                name="review"
                id="review"
                cols="30"
                rows="5"
                className="mt-4 text-lg text-neutral-500 w-[600px] mx-auto border-[3px] border-color-[gray] rounded"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <button
                onClick={() => review && addReview(review)}
                className="mt-4 text-lg text-emerald-600 bg-gray"
                type="button"
              >
                Submit Review
              </button>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default LibraryInner;
