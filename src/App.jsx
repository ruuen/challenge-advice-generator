import AdviceGenerator from "./components/AdviceGenerator";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  return (
    <>
      <h1 className="visually-hidden">Advice Generator</h1>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <AdviceGenerator />
      </ErrorBoundary>
    </>
  );
}

export default App;
