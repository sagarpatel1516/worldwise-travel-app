import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton(): React.JSX.Element {
  const navigate = useNavigate();

  function handleClick(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Button type="back" onClick={handleClick}>
      Back
    </Button>
  );
}

export default BackButton;
