import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

const SlotContainer = styled.div`
  background-color: ${({ isOver }) => (isOver ? "lightgreen" : "white")};
  border: 1px solid gray;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieceImage = styled.img`
  width: 100%;
  height: 100%;
`;

const PuzzleTarget = ({ id, placedPiece, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PIECE",
    drop: (item) => onDrop(item.piece, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <SlotContainer ref={drop} isOver={isOver}>
      {placedPiece && <PieceImage src={placedPiece.src} alt="puzzle piece" />}
    </SlotContainer>
  );
}

export default PuzzleTarget;
