import React from "react";

type PieceProps = {
  image: string;
};

const Piece: React.FC<PieceProps> = ({ image }) => {
  return <img src={image}></img>; //TODO Need to add alt property
};

export default Piece;
