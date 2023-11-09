import imgDiceIcon from "../assets/icon-dice.svg";

// Reusable submit/search button
function Button({ handleClick }) {
  return (
    <button className="generator__button" onClick={handleClick}>
      <img src={imgDiceIcon} alt="" className="generator__button-icon" />
    </button>
  );
}

export default Button;
