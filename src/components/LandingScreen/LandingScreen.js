import React from "react";
import styled, {keyframes} from "styled-components";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import HowToPlayModal from "./HowToPlayModal";
import FunFactsModal from "./FunFacts";
import { spinscale } from "../Keyframes";

import { ReactComponent as EarthSvg } from "../../assets/earth.svg";
import { ReactComponent as StarsSvg } from "../../assets/stars.svg";
import { ReactComponent as SpaceOctopus } from "../../assets/space-octopus.svg";

// Subtle floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

// Slow earth spin
const slowSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Gentle Octopus wave
const octoWave = keyframes`
  0% { transform: rotate(0deg) translateY(0); }
  50% { transform: rotate(2deg) translateY(-5px); }
  100% { transform: rotate(0deg) translateY(0); }
`;

const Container = styled.div`
  background-image: linear-gradient(#060606, #08345c);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  width: 100vw;
  z-index: -10;
`;
const ButtonWrapper = styled.div`
  text-align: center;
`

const Spacer = styled.div`
width: 2.5vw;
padding-bottom:5.5vh;
`
const Title = styled.h1`
  background-color: #ff8a00;
  font-family: "Freckle Face", cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 9vh;
  text-align: center;
  line-height: 9vh;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  margin-bottom: 0;
  position: relative;
  top: 10%;
  z-index: 5;
  @media (max-width: 480px) {
    font-size: 5vh;
    line-height: 7vh;;
  }
`;

const Octopus = styled.div`
  position: absolute;
  top: 25px;
  right: 20px;
  animation: ${octoWave} 3s ease-in-out infinite;
`;

const Earth = styled.div`
  position: absolute;
  bottom: 0; /* allows space for full circle to show */
  left: -150px;
  overflow: visible; /* allow the SVG to render outside bounds */
  z-index: 1;

  svg {
  
    max-height: 40vh;
    animation: ${slowSpin} 60s linear infinite;
    transform-origin: center;
  }

  @media (max-width: 480px) {
    bottom: -8vh;
    svg {
      width: 60vw;
      max-height: 25vh;
    }
  }
`;


const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: center;
  margin-bottom: 0.5em;
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  overflow: hidden;
  animation: ${ spinscale } 6s ease-in-out infinite alternate;
`;

const LandingScreen = props => {
  const navigate = useNavigate();
  const isMobileScreen = window.matchMedia('screen and (max-width: 768px)').matches;
  const startGame = () => {
    navigate("/game-selection")
  };

  return (
    
    <Container>
      <Title>reduce, reuse, recycle!</Title>


      <Octopus>
        <SpaceOctopus />
      </Octopus>
      <Stars>
        <StarsSvg />
      </Stars>
      <Earth>
        <EarthSvg />
      </Earth>
      {!isMobileScreen && <Spacer/> }
      <ButtonWrapper>
        <Button
          primaryR
          type="button"
          renderAs="button"
          handleClick={startGame}
          label="Let's Play!"
        ></Button>
        <Spacer/>
        {!isMobileScreen && <Spacer/> }
        <ButtonContainer>
          {props.howToPlayModal && (
            <HowToPlayModal
              handleClose={props.hideHowToPlayModal}
            ></HowToPlayModal>
          )}
          {props.funFactsModal && (
            <FunFactsModal handleClose={props.hideFunFactsModal}></FunFactsModal>
          )}
          
          <Button
            type="button"
            handleClick={props.showHowToPlayModal}
            label="How To Play"
          ></Button>
          <Spacer/>
          <Button
            type="button"
            handleClick={props.showFunFactsModal}
            label="Fun Facts"
          ></Button>
        </ButtonContainer>
      </ButtonWrapper>
      <Spacer/>
    </Container>
   
    
  );
};

export default LandingScreen;
