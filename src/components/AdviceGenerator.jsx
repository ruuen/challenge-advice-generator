import AdviceDisplay from "./AdviceDisplay";
import Button from "./Button";
import "./AdviceGenerator.scss";
import imgDividerMobile from "../assets/pattern-divider-mobile.svg";
import imgDividerDesktop from "../assets/pattern-divider-desktop.svg";
import { useCallback, useEffect, useState } from "react";

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

// Fetches advice slip data, stores advice & error state, passes down to components
function AdviceGenerator() {
  const [adviceSlips, setAdviceSlips] = useState(initialAdviceState);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchAdviceData = useCallback(async () => {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    // If a "message" field exists in Advice Slip API response, an error has occurred and data wasn't fetched
    // TODO: Change error display from the glorious console.log to be shown in UI
    if (Object.keys(data).includes("message")) {
      console.log(`Fetch error: ${data.message}`);
      return;
    }

    setAdviceSlips([{ ...data.slip }]);
  });

  useEffect(() => {
    if (isLoading === false) return;

    // TODO: When search added, logic here will check whether search state contains user input to decide what endpoint should be called
    // TODO: Change error display from the glorious console.log to be shown in UI
    fetchAdviceData().catch((error) => console.log(error));

    setIsLoading(false);
  }, [isLoading]);

  return (
    <article className="generator">
      <AdviceDisplay adviceSlips={adviceSlips} isLoading={isLoading} />
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
        <Button handleClick={() => setIsLoading(true)} />
      </div>
    </article>
  );
}

export default AdviceGenerator;
