import React from "react";
import styled from "styled-components";
import PuzzlePiece from "./PuzzlePiece";
import PuzzleTarget from "./PuzzleTarget";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Adjust layout for larger screens */
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const PuzzlePiecesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  width: 300px;

  /* Keep pieces container and targets side-by-side on desktop */
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 20px;
  }
`;

const PuzzleTargetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  background-color: #f0f0f0;
  grid-gap: 5px;

  /* Adjust grid for medium-sized screens */
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 100px); /* Switch to 2 columns */
  }

  /* Adjust grid for small screens */
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 100px); /* Switch to 1 column */
  }
`;

const PuzzleBoard = ({ pieces, rows, cols, placedPieces, onDrop }) => {
  return (
    <BoardContainer>
      <PuzzlePiecesContainer>
        {pieces.map((piece) => (
          <PuzzlePiece key={piece.id} piece={piece} />
        ))}
      </PuzzlePiecesContainer>
      <PuzzleTargetsContainer>
        {[...Array(rows * cols)].map((_, index) => (
          <PuzzleTarget
            key={index}
            id={index}
            placedPiece={placedPieces[index]}
            onDrop={onDrop}
          />
        ))}
      </PuzzleTargetsContainer>
    </BoardContainer>
  );
}

export default PuzzleBoard;
