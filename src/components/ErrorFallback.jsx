import "./ErrorFallback.scss";

function ErrorFallback() {
  return (
    <div className="app-error" role="alert">
      <h2 className="app-error__heading">An error occurred</h2>
      <p className="app-error__content">
        There was a problem with the Advice Generator app, and it wasn't your
        fault.
      </p>
      <p className="app-error__content">
        Please refresh the page and try again.
      </p>
    </div>
  );
}

export default ErrorFallback;
