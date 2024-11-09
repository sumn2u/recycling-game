import React, { useState, useEffect } from "react";
import PuzzleBoard from "./PuzzleBoard";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MessageModal from "../MessageModal";
import * as SC from "../GameScreen/GameScreen.style"
import { ReactComponent as StarsSvg } from "../../assets/stars.svg";
import { IconImage } from "../MasterCss";
import ProgressScore from "../GameScreen/ProgressScore";
import HowToPlayModal from "../LandingScreen/HowToPlayModal";
import OptionsModal from "../GameScreen/OptionsModal";
import LivesScore from "../GameScreen/LivesScore";
import { ReactComponent as SpaceOctopus } from "../../assets/space-octopus.svg";
import { spinscale } from "../Keyframes";
import PauseIcon  from "../../assets/pause-icon.svg";

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 120vw;
  height: 100vh;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  overflow: hidden;
  animation: ${ spinscale } 4s linear infinite alternate;
`;

const PuzzleBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(#060606, #08345c);
  align-items: center;
  width: 100%;
  padding: 20px;
  width: 100vw;
  z-index: -10;
  height: 100vh;

  @media (max-width: 768px) {
    max-width: 90%; /* Adjust for smaller screens */
  }

  @media (max-width: 480px) {
    max-width: 100%; /* Full width on very small screens */
    padding: 10px;
  }
`;


const Octopus = styled.div`
    position: absolute;
    bottom: 10px;
    overflow: hidden;
    left: 10px;
    animation: ${ spinscale } 8s linear infinite alternate;
`;

const PuzzleBoardScreen = props => {
  const [imagePieces, setImagePieces] = useState([]);
  const [placedPieces, setPlacedPieces] = useState({});
  const [message, setMessage] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const [failModal, setFailModal] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = props.puzzleImage;
    img.onload = () => splitImage(img, 3, 3); // 3x3 grid
  }, []);

  const splitImage = (img, rows, cols) => {
    const pieceWidth = img.width / cols;
    const pieceHeight = img.height / rows;
    const pieces = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const canvas = document.createElement("canvas");
        canvas.width = pieceWidth;
        canvas.height = pieceHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
        pieces.push({ id: `${x}-${y}`, src: canvas.toDataURL(), x, y });
      }
    }
    setImagePieces(shuffleArray(pieces));
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleDrop = (piece, targetId) => {
    setPlacedPieces((prev) => ({
      ...prev,
      [targetId]: piece,
    }));
  };
  const navigate = useNavigate();

  const checkIfPuzzleCompleted = () => {
    const allSlotsFilled = Object.keys(placedPieces).length === 9; // 3x3 grid, 9 slots
    if (allSlotsFilled) {
      const isCorrect = Object.entries(placedPieces).every(([targetId, piece]) => {
        const targetX = targetId % 3;
        const targetY = Math.floor(targetId / 3);
        return piece.x === targetX && piece.y === targetY;
      });

      if (isCorrect) {
            setMessage({ text: "🎉 Amazing! You nailed it! Puzzle completed perfectly! 🧩", type: "success" });
            props.setCount(props.count + 2);
        } else {
            setMessage({ text: "⚠️ Oops! Almost there, but the pieces aren’t quite right yet. Give it another try!", type: "error" });
            props.setBadCount(props.badCount + 1);
        }
    }
  };

  useEffect(() => {
    checkIfPuzzleCompleted();
  }, [placedPieces]);

  const closeMessageModal = () => {
    setMessage(null); // Close the modal
    if (props.badCount === 3) {
        navigate(`/results?game=waste-puzzle`);
    }
  };

  const showOptionsModal = () => {
    setOptionsModal(!optionsModal);
  };

  return (
    <PuzzleBoardContainer>

{optionsModal && (
        <OptionsModal
          optionsModal={optionsModal}
          setOptionsModal={setOptionsModal}
          setCount={props.setCount}
          setGame={props.setGame}
          setBadCount={props.setBadCount}
          funFactsModal={props.funFactsModal}
          setFunFactsModal={props.setFunFactsModal}
          howToPlayModal={props.howToPlayModal}
          setHowToPlayModal={props.setHowToPlayModal}
          showFunFactsModal={props.showFunFactsModal}
          hideFunFactsModal={props.hideFunFactsModal}
          hideHowToPlayModal={props.hideHowToPlayModal}
          showHowToPlayModal={props.showHowToPlayModal}
        />
      )}

    {props.howToPlayModal && (
          <HowToPlayModal handleClose={props.hideHowToPlayModal} game={"waste-puzzle"}></HowToPlayModal>
      )}

    <SC.Header>
        <IconImage game  onClick={showOptionsModal} src={PauseIcon} cursor="pointer"/>
        <SC.LivesContainer>
            
          <LivesScore
            badCount={props.badCount}
            successModal={successModal}
            failModal={failModal}
          />
        </SC.LivesContainer> 
        <ProgressScore gameScreen count={props.count} /> 
      </SC.Header>
    
        {message && (
        <MessageModal
          type={message.type}
          message={message.text}
          onClose={closeMessageModal}
        />
      )}
    <Octopus>
            <SpaceOctopus />
      </Octopus>
        <Stars>
            <StarsSvg />
        </Stars>
      <PuzzleBoard pieces={imagePieces} rows={3} cols={3} placedPieces={placedPieces} onDrop={handleDrop} />
    </PuzzleBoardContainer>
  );
}

export default PuzzleBoardScreen;
