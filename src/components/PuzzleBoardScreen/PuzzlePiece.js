import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

const PieceImage = styled.img`
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  cursor: move;
  width: 100px;
  height: 100px;
  margin: 5px;
`;

const PuzzlePiece = ({ piece }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PIECE",
    item: { id: piece.id, piece },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return <PieceImage ref={drag} src={piece.src} alt="puzzle piece" isDragging={isDragging} />;
}

export default PuzzlePiece;
