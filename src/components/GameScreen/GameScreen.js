import React, {useState, useEffect} from "react";
import { useDrag, useDrop } from "react-dnd";
import ProgressScore from "./ProgressScore";
import SuccessModal from "./SuccessModal";
import FailModal from "./FailModal";
import OptionsModal from "./OptionsModal";
import Item from "./Item";
import LivesScore from "./LivesScore";
import { Container, IconImage, ShakingIconBin } from "../MasterCss";
import HowToPlayModal from "../LandingScreen/HowToPlayModal";
import FunFactsModal from "../LandingScreen/FunFacts";
import * as SC from "./GameScreen.style";
import RecycleBin from "../../assets/recycle-bin.svg";
import BlackBin  from "../../assets/waste-bin-tidyman.svg";
import CompostBin from "../../assets/compostable-bin.svg";
import YardWasteBin from "../../assets/yard-waste.svg";
import SpecialProgramsBin from "../../assets/special-programs.svg";
import WineBottle from "../../images/wine-bottle.svg";
import PauseIcon  from "../../assets/pause-icon.svg";
import ResponsiveSvg from "../ResponsiveSvg";
import { useLocation } from 'react-router-dom';
import { getActiveBins, getValidItemsForGameType} from "../../utils/gameUtils";
import items from "../../utils/itemData";
import { useNavigate } from "react-router-dom"

const ItemTypes = {
  BIN: 'bin',
};

// Draggable Item Component
const DraggableItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BIN,
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [item]);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.9 : 1 }}>
      <Item item={item} />
    </div>
  );
};

// Droppable Target Component
const DroppableTarget = ({ onDrop, binType, isShaking }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BIN,
    drop: (item) => onDrop(item, binType),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [onDrop, binType]);

  return (
    <ShakingIconBin
      ref={drop}
      isShaking={isOver}
      src={getBinImageSrc(binType)} // Pass the src here based on binType
      alt={`bin-${binType}`}
    />
  );
};

// Helper function to get image source based on bin type
const getBinImageSrc = (binType) => {
  switch (binType) {
    case 'general waste':
      return BlackBin;
    case 'recycling':
      return RecycleBin;
    case 'food compost':
      return CompostBin;
    case 'yard waste':
      return YardWasteBin;
    case 'special programs':
      return SpecialProgramsBin;
    default:
      return '';
  }
};


const GameScreen = props => {
  const [currentItem, setCurrentItem] = useState({
    name: "Glass Bottles",
    src: WineBottle,
    bin: "recycling",
    binImg: "images/recycle-bin.svg",
    fact: "Families use around 330 glass bottles and jars every year"
  });
  const navigate = useNavigate();
  const [itemVisibility, setItemVisibility] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [remainingItems, setRemainingItems] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [shakingBin, setShakingBin] = useState(null);
  const [failModal, setFailModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  // State for screen size
  const [isMobileScreen, setIsMobileScreen] = useState(window.matchMedia('screen and (max-width: 768px)').matches);
  const [isSmallMobileScreen, setIsSmallMobileScreen] = useState(window.matchMedia('screen and (max-width: 425px)').matches);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gameType = queryParams.get('type');

  // Function to check screen sizes
  const checkScreenSize = () => {
    setIsMobileScreen(window.matchMedia('screen and (max-width: 768px)').matches);
    setIsSmallMobileScreen(window.matchMedia('screen and (max-width: 425px)').matches);
  };

  const activeBins = getActiveBins(gameType);

  useEffect(() => {
    const validItems = getValidItemsForGameType(items, gameType);
    setRemainingItems(validItems);
    
    // Pick the first item
    const firstItem = validItems[Math.floor(Math.random() * validItems.length)];
    setCurrentItem(firstItem);

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Function to pick next item without repetition
  const pickNextItem = () => {
    let newRemaining = remainingItems.filter((item) => item.name !== currentItem.name);

    // If all items used, reset the pool
    if (newRemaining.length === 0) {
      newRemaining = getValidItemsForGameType(items, gameType);
     
      if (newRemaining.length === 0) {
        navigate(`/results?game=waste-sorting&type=${gameType}`);
        return;
      }
    }

    const nextItem = newRemaining[Math.floor(Math.random() * newRemaining.length)];
    setRemainingItems(newRemaining);
    setCurrentItem(nextItem);
    setItemVisibility(true);
  };

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

  const dropped = (item, binType) => {
    // Set the shaking bin
    dropReaction(binType);
  };

  const showOptionsModal = () => {
    setOptionsModal(!optionsModal);
  };


  return (
    <Container key="rendering">
      {successModal && (
        <SuccessModal
          item={currentItem}
          gameType={gameType}
          setSuccessModal={setSuccessModal}
          pickNextItem={pickNextItem}
          remainingItems={remainingItems}
        />
      )}
      {failModal && (
        <FailModal
          item={currentItem}
          setFailModal={setFailModal}
          game={"waste-sorting"}
          gameType={gameType}
          remainingItems={remainingItems}
          pickNextItem={pickNextItem}
          badCount={props.badCount}
        />
      )}
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
          showRecycleInformation={true}
          hideFunFactsModal={props.hideFunFactsModal}
          hideHowToPlayModal={props.hideHowToPlayModal}
          showHowToPlayModal={props.showHowToPlayModal}
        />
      )}

      {props.howToPlayModal && (
        <HowToPlayModal handleClose={props.hideHowToPlayModal} game={"waste-sorting"}></HowToPlayModal>
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
      {isMobileScreen && <SC.Algae2 /> }
      {!isMobileScreen && <SC.Algae3 />}
      
      {!isMobileScreen && <SC.Algae1 />}
      {!isMobileScreen && <SC.Crab /> }
      {!isMobileScreen && <SC.Seahorse /> }
      {!isMobileScreen && <SC.RedFish />} 
      {/* {!isMobileScreen && <SC.Bubbles /> }  */}
      {!isMobileScreen &&<ResponsiveSvg SvgComponent={SC.Wave2} />}
      {!isMobileScreen && <ResponsiveSvg SvgComponent={SC.Wave3} />}
     
      {!isMobileScreen && <ResponsiveSvg SvgComponent={SC.Wave4} />}
      <SC.GameItem>
        
          {itemVisibility && (
            <DraggableItem
            item={currentItem}
          />
          )}

      </SC.GameItem>
      <SC.BinContainer>
        {activeBins.includes('general waste') && (
          <SC.BlackBinBox>
          <DroppableTarget
              onDrop={(item, binType) => dropped(item, binType)}
              binType="general waste"
              isShaking={shakingBin === "general waste"}
            />
          </SC.BlackBinBox>
        )}

        {activeBins.includes('special programs') && (
          <SC.SpecialBinBox>
          <DroppableTarget
              onDrop={(item, binType) => dropped(item, binType)}
              binType="special programs"
              isShaking={shakingBin === "special programs"}
            />
          </SC.SpecialBinBox>
        )}

        {activeBins.includes('recycling') && (
          <SC.RecycleBinBox>
          <DroppableTarget
              onDrop={(item, binType) => dropped(item, binType)}
              binType="recycling"
              isShaking={shakingBin === "recycling"}
            />
          </SC.RecycleBinBox>
        )}
        
        {activeBins.includes('food compost') && (
          <SC.CompostBinBox>
          <DroppableTarget
              onDrop={(item, binType) => dropped(item, binType)}
              binType="food compost"
              isShaking={shakingBin === "food compost"}
            />
          </SC.CompostBinBox>
        )}

        {activeBins.includes('yard waste') && (
          <SC.YardBinBox>
          <DroppableTarget
              onDrop={(item, binType) => dropped(item, binType)}
              binType="yard waste"
              isShaking={shakingBin === "yard waste"}
            />
          </SC.YardBinBox>
        )}
      </SC.BinContainer>
      {/* {!isMobileScreen && <SC.Octopus /> } */}
      {isMobileScreen && !isSmallMobileScreen && <ResponsiveSvg SvgComponent={SC.Wave5} /> }
      {/* {!isMobileScreen && <ResponsiveSvg SvgComponent={SC.Wave5} />} */}
      <SC.ItemText>{currentItem.name}</SC.ItemText>
    </Container>
  );
};

export default GameScreen;
