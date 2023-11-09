import AdviceDisplay from "./AdviceDisplay";
import Button from "./Button";
import "./AdviceGenerator.scss";
import imgDividerMobile from "../assets/pattern-divider-mobile.svg";
import imgDividerDesktop from "../assets/pattern-divider-desktop.svg";
import { useState } from "react";

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
  const [hasError, setHasError] = useState(false);

  return (
    <article className="generator">
      <AdviceDisplay adviceSlips={adviceSlips} />
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
        <Button />
      </div>
    </article>
  );
}

export default AdviceGenerator;
