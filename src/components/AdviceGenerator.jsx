import AdviceDisplay from "./AdviceDisplay";
import Button from "./Button";
import "./AdviceGenerator.scss";
import imgDividerMobile from "../assets/pattern-divider-mobile.svg";
import imgDividerDesktop from "../assets/pattern-divider-desktop.svg";
import { useCallback, useEffect, useState } from "react";
import useThrowAsyncError from "./ErrorBoundary/useThrowAsyncError";

// State is an array of advice slips to allow adding search functionality
// Search may return multiple advice slips, which can then be cycled through by the user
// Random advice will always return a single advice slip
const initialAdviceState = [
  {
    id: 117,
    advice:
      "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
  },
  // {
  //   id: 118,
  //   advice:
  //     "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
  // },
];

const initialErrorState = {
  hasError: false,
  errorMessage: "",
};

// Fetches advice slip data, stores advice & error state, passes down to components
function AdviceGenerator() {
  const [adviceSlips, setAdviceSlips] = useState(initialAdviceState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(initialErrorState);

  const throwAsyncError = useThrowAsyncError();

  const fetchAdviceData = useCallback(async () => {
    setErrorState(initialErrorState);

    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    // If a "message" field exists in Advice Slip API response, the API is returning an error message or couldn't find advice slips
    if (Object.keys(data).includes("message")) {
      setErrorState({
        hasError: true,
        errorMessage: data.message.text,
      });
      setAdviceSlips([{ id: null, advice: "" }]);
      setIsLoading(false);
      return;
    }

    setAdviceSlips([{ ...data.slip }]);
    setIsLoading(false);
  });

  useEffect(() => {
    if (isLoading === false) return;

    // TODO: When search added, logic here will check whether search state contains user input to decide what endpoint should be called
    fetchAdviceData().catch((error) => {
      throwAsyncError(error);
    });
  }, [isLoading]);

  return (
    <article className="generator">
      <AdviceDisplay
        adviceSlips={adviceSlips}
        isLoading={isLoading}
        errorState={errorState}
      />
      <div className="generator__divider">
        <picture>
          <source
            media="(min-width: 37.5rem)"
            srcSet={imgDividerDesktop}
            width="444"
            height="16"
          />
          <img
            src={imgDividerMobile}
            alt=""
            className="generator__divider-img"
            width="295"
            height="16"
          />
        </picture>
      </div>
      <div className="generator__action-buttons">
        <Button handleClick={() => setIsLoading(true)} label="New advice" />
      </div>
    </article>
  );
}

export default AdviceGenerator;
