import React from "react";
import styled from "styled-components";
import items from "../../utils/itemData";
import Button from "../Button";
import * as SC from "../MasterCss";
import UIfx from "uifx";
import successSound from "../../assets/sounds/hero_decorative-celebration-02.mp3";
import {getValidItemsForGameType} from "../../utils/gameUtils";
const SuccessBox = styled.div`
  background-color: rgba(36, 174, 95, 0.7);
  padding: 3em;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1500;
  padding: 0px;
`;

const SuccessModal = props => {
  const successUIFX = new UIfx(successSound)
  successUIFX.play()

  const handleClose = () => {
    props.setSuccessModal(false);
    props.pickNextItem();
  };

  return (
    <SuccessBox id="success" onClick={handleClose}>
      <SC.ModalHeader>Well Done!</SC.ModalHeader>
      <SC.ModalHeader>
        <SC.OrangeText>{props.item.name} </SC.OrangeText> go in the <SC.OrangeText> {props.item.bin}</SC.OrangeText> {['yard waste', 'special programs'].includes(props.item.bin.toLowerCase()) ? '' : ' bin'}.
      </SC.ModalHeader>
      <SC.BadgeBox>
        
        <SC.MessageBox expand>
        <SC.MessageImage alt={props.item.name} src={props.item.src} />
        <SC.BoxMessage>{props.item.fact}</SC.BoxMessage>
        </SC.MessageBox>
      </SC.BadgeBox>
      <Button primary handleClick={handleClose} label="OK" />
    </SuccessBox>
  );
};

export default SuccessModal;
