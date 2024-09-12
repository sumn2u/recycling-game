import React, {useState} from "react";
import ProgressScore from "./ProgressScore";
import SuccessModal from "./SuccessModal";
import FailModal from "./FailModal";
import OptionsModal from "./OptionsModal";
import Item from "./Item";
import LivesScore from "./LivesScore";
import { Container, IconImage, IconBin } from "../MasterCss";
import HowToPlayModal from "../LandingScreen/HowToPlayModal";
import FunFactsModal from "../LandingScreen/FunFacts";
import * as SC from "./GameScreen.style";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import RecycleBin from "../../assets/recycle-bin.svg";
import BlackBin  from "../../assets/waste-bin-tidyman.svg";
import CompostBin from "../../assets/compostable-bin.svg";
import WineBottle from "../../images/wine-bottle.svg";
import PauseIcon  from "../../assets/pause-icon.svg";
import ResponsiveSvg from "../ResponsiveSvg";

const GameScreen = props => {
  const [currentItem, setCurrentItem] = useState({
    name: "Glass Bottles",
    src: WineBottle,
    bin: "recycling",
    binImg: "images/recycle-bin.svg",
    fact: "Families use around 330 glass bottles and jars every year"
  });
  const [itemVisibility, setItemVisibility] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const isMobileScreen = window.matchMedia('screen and (max-width: 768px)').matches;
  const dropReaction = currentBin => {
    setItemVisibility(!itemVisibility);

    if (currentItem.bin === currentBin) {
      setSuccessModal(!successModal);
      props.setCount(props.count + 1);
    } else {
      setFailModal(!failModal);
      props.setBadCount(props.badCount + 1);
    }
  };

  const showOptionsModal = () => {
    setOptionsModal(!optionsModal);
  };

  return (
    <Container key="rendering">
      {successModal && (
        <SuccessModal
          item={currentItem}
          setCurrentItem={setCurrentItem}
          itemVisibility={itemVisibility}
          setItemVisibility={setItemVisibility}
          successModal={successModal}
          setSuccessModal={setSuccessModal}
        />
      )}
      {failModal && (
        <FailModal
          item={currentItem}
          setCurrentItem={setCurrentItem}
          itemVisibility={itemVisibility}
          setItemVisibility={setItemVisibility}
          failModal={failModal}
          setFailModal={setFailModal}
          badCount={props.badCount}
        />
      )}
      {optionsModal && (
        <OptionsModal
          optionsModal={optionsModal}
          setOptionsModal={setOptionsModal}
          setCount={props.setCount}
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
        <HowToPlayModal handleClose={props.hideHowToPlayModal}></HowToPlayModal>
      )}
      {props.funFactsModal && (
        <FunFactsModal handleClose={props.hideFunFactsModal}></FunFactsModal>
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
      
      {!isMobileScreen && <SC.Jellyfish /> }
      {!isMobileScreen && <SC.Scallop /> }
      {!isMobileScreen && <SC.Algae1 />}
      {!isMobileScreen && <SC.Algae2 /> }
      {!isMobileScreen && <SC.Algae3 />}
      
      {!isMobileScreen && <SC.Algae1 />}
      {!isMobileScreen && <SC.Crab /> }
      {!isMobileScreen && <SC.Seahorse /> }
      {!isMobileScreen && <SC.RedFish />} 
      {!isMobileScreen && <SC.Bubbles /> }
      {!isMobileScreen &&<ResponsiveSvg SvgComponent={SC.Wave2} />}
      {!isMobileScreen && <ResponsiveSvg SvgComponent={SC.Wave3} />}
     
      {!isMobileScreen && <ResponsiveSvg SvgComponent={SC.Wave4} />}
      <SC.GameItem>
        <DragDropContainer targetKey="bins">
          {itemVisibility && (
            <Item
              item={currentItem}
              itemVisibility={itemVisibility}
              setItemVisibility={setItemVisibility}
            />
          )}
        </DragDropContainer>
      </SC.GameItem>

      <SC.BlackBinBox>
        <DropTarget
          targetKey="bins"
          onHit={() => {
            dropReaction("general waste");
          }}
        >
          <IconBin dustbin src={BlackBin}  title="blackbin" />
        </DropTarget>
      </SC.BlackBinBox>

      <SC.RecycleBinBox>
        <DropTarget
          targetKey="bins"
          onHit={() => {
            dropReaction("recycling");
          }}
        >
          <IconBin dustbin src={RecycleBin}  title="recyclebin" />
        </DropTarget>
      </SC.RecycleBinBox>

      <SC.CompostBinBox>
        <DropTarget
          targetKey="bins"
          onHit={() => {
            dropReaction("food compost");
          }}
        >
        <IconBin dustbin src={CompostBin} title="compostbin" />
        </DropTarget>
      </SC.CompostBinBox>

      {!isMobileScreen && <SC.Octopus /> }
      {!isMobileScreen && <ResponsiveSvg SvgComponent={SC.Wave5} /> }

      <SC.ItemText>{currentItem.name}</SC.ItemText>
    </Container>
  );
};

export default GameScreen;
