import React from "react";

type ResetGameButtonProps = {
  onClick: () => void;
};

const ResetGameButton: React.FC<ResetGameButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Reset</button>;
};

export default ResetGameButton;
