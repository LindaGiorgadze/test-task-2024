import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios("http://localhost:3001/books")
      .then((data) => setBooks(data?.data))
      .catch(console.warn);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">My Books</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {books?.map((product) => {
            const progress = product.progress / product.pageCount;
            return (
              <Link
                key={product.id}
                to={`${product.id}`}
                className="group block h-[400px] "
              >
                <div className="aspect-h-1 aspect-w-1 w-full h-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <div className="book-cover h-full w-full object-cover object-contain group-hover:opacity-75">
                    <div>
                      <h1 className="text-lg">{product.title}</h1>
                      <div class="separator"></div>
                      <h2 className="text-lg">{product.genre?.toUpperCase()}</h2>
                      <p className="mt-1 text-sm font-regular text-neutral-300">
                        Pages: {product.pageCount}
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
