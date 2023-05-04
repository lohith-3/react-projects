import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured</p>
      <p style={{ marginTop: "1rem" }}>
        <i>{error.status}</i>
      </p>
      <p>
        <i>{error.data}</i>
      </p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
