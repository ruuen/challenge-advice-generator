import { useState } from "react";

// Takes an array of advice slips
// If a single slip exists, it will display the data without any selection buttons
// If multiple advice slips exist, displays two selection buttons to change index of rendered advice slip forwards/backwards
// Multiple advice slips are returned from the Advice Slip API when calling their search endpoint, and I'll be adding a search function in future
function AdviceDisplay({ adviceSlips }) {
  const [selectedAdviceIndex, setSelectedAdviceIndex] = useState(0);

  const hasMultipleAdviceItems = adviceSlips.length > 1 ? true : false;

  function selectPreviousAdvice() {
    setSelectedAdviceIndex((prevIndex) => {
      if (prevIndex === 0) return adviceSlips.length - 1;
      return prevIndex - 1;
    });
  }

  function selectNextAdvice() {
    setSelectedAdviceIndex((prevIndex) => {
      if (prevIndex >= adviceSlips.length - 1) return 0;
      return prevIndex + 1;
    });
  }

  // TODO: When search func is being built, the prev/next buttons for multiple slips needs styling & icons
  return (
    <div className="generator__display">
      {hasMultipleAdviceItems ? (
        <button
          className="generator__arrow-button"
          onClick={selectPreviousAdvice}
        >
          Previous
        </button>
      ) : (
        <></>
      )}
      <h2 className="generator__number">{`Advice #${adviceSlips[selectedAdviceIndex].id}`}</h2>
      <p className="generator__content">{`"${adviceSlips[selectedAdviceIndex].advice}"`}</p>
      {hasMultipleAdviceItems ? (
        <button className="generator__arrow-button" onClick={selectNextAdvice}>
          Next
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AdviceDisplay;
