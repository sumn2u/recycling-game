import React from "react";
import styled from "styled-components";
import items from "../../utils/itemData";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import * as SC from "../MasterCss";
import UIfx from "uifx";
import errorSound from "../../assets/sounds/alert_error-01.mp3";
import {getValidItemsForGameType} from "../../utils/gameUtils";

const FailBox = styled.div`
  background-color: rgba(235, 16, 16, 0.7);
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

const FailModal = props => {
  const errorUIFX = new UIfx(errorSound)
  errorUIFX.play()
  const hideModal = () => {
    props.setFailModal(!props.failModal);

    // Filter items to match current gameType bins
    const validItems = getValidItemsForGameType(items, props.gameType);

    let shuffle = validItems.sort((a, b) => {
      return 0.5 - Math.random();
    });
    props.setCurrentItem(shuffle[0]);
    props.setItemVisibility(!props.itemVisibility);
  };

  const navigate = useNavigate();
  const handleModal = () => {
    hideModal();
    if (props.badCount === 3) {
      navigate(`/results?game=${props.game}&type=${props.gameType}`);
    }
  };

  

  return (
    <FailBox id="fail" onClick={hideModal}>
      
      <SC.ModalHeader>Uh Oh!</SC.ModalHeader>
      <SC.ModalHeader>
        <SC.OrangeText>{props.item.name}</SC.OrangeText> go in the <SC.OrangeText>{props.item.bin}</SC.OrangeText> bin.
      </SC.ModalHeader>
      <SC.BadgeBox>
        <SC.MessageBox expand>
        <SC.MessageImage alt={props.item.name} src={props.item.src} />
        <SC.BoxMessage>{props.item.fact}</SC.BoxMessage>
        </SC.MessageBox>
      </SC.BadgeBox>
      <Button primary handleClick={handleModal} label="OK" />
    </FailBox>
  );
};

export default FailModal;
