import React from "react";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
