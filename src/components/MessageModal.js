import React, { useEffect } from "react";
import styled from "styled-components";
import UIfx from "uifx";
import successSound from "../assets/sounds/hero_decorative-celebration-02.mp3";
import errorSound from "../assets/sounds/alert_error-01.mp3";
import Button from "../components/Button";

const ModalContainer = styled.div`
  background-color: ${({ success }) => (success ? "rgba(36, 174, 95, 0.9)" : "rgba(255, 0, 0, 0.8)")};
  color: white;
  padding: 3em;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1500;
  @media (max-width: 480px) {
    padding: 1.5em;
    font-size: 1.2em; // Adjust font size for smaller screens
  }
`;

const ModalMessage = styled.h1`
  font-size: 2em;
  margin-bottom: 1em;
  @media (max-width: 768px) {
    padding: 1.5em;
    font-size: 1.2em; // Adjust font size for smaller screens
  }
`;

const MessageModal = ({ type, message, onClose }) => {
  const sound = type === "success" ? new UIfx(successSound) : new UIfx(errorSound);

  useEffect(() => {
    sound.play();
  }, [sound]);

  return (
    <ModalContainer success={type === "success"} onClick={onClose}>
      <ModalMessage>{message}</ModalMessage>
      <Button primary handleClick={onClose} label="OK" />
    </ModalContainer>
  );
};

export default MessageModal;
