import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>

      <Link to="/">
        <button className="btn btn-soft btn-secondary mx-auto block mt-[200px]">
          Back to Home Page
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
