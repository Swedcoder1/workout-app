import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <p className="text-3xl">
        404 page not found get back
        <Link to="/" className="ml-2 text-blue-400 underline">
          here
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;
