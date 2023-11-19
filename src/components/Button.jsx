import "./Button.scss";
import imgDiceIcon from "../assets/icon-dice.svg";

// Reusable submit/search button
function Button({ handleClick, label }) {
  return (
    <button
      className="generator__button"
      onClick={handleClick}
      aria-label={label}
    >
      <img
        src={imgDiceIcon}
        alt=""
        className="generator__button-icon"
        width="24"
        height="24"
      />
    </button>
  );
}

export default Button;
