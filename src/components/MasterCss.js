import styled, { keyframes, css } from "styled-components";

const Paragraph = styled.p`
  font-size: 0.95em;
  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;
const Container = styled.div`
  background-image: linear-gradient(#21b2d3, #7abefd);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled(Container)`
  justify-content: start;
`;

const PageHeader = styled.h1`
  font-family: Freckle Face;
  font-style: normal;
  font-weight: normal;
  font-size: 5vh;
  line-height: 4vh;
  text-align: center;
  color: #ff8a00;
  -webkit-text-stroke: 2px black;
  text-transform: uppercase;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin-block-end: 0px;
  display: inline;
  @media (max-width: 480px) {
    font-size: 4vh;
    line-height: 4vh;;
    margin-left: 2rem;
    ${props =>

    props.nomargin &&
    css`
      margin: 0;
    `}
  }

`;

const PageTitle = styled.h1`
  font-family: Freckle Face;
  font-style: normal;
  font-weight: normal;
  font-size: 5vh;
  line-height: 4vh;
  color: #ff8a00;
  -webkit-text-stroke: 2px black;
  text-transform: uppercase;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin-block-end: 0px;
  display: inline;
  @media (max-width: 480px) {
    font-size: 4vh;
    line-height: 4vh;;
    margin-left: 2rem;
    ${props =>

    props.nomargin &&
    css`
      margin: 0;
    `}
  }

`;

const MessageBox = styled.div`
  width: 80vw;
  min-height: 20vh;
  border-radius: 1.5vh;
  background-color: #08345c;
  color: white;
  padding: 1.5vw;
  margin: 1em;
  display:flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  transition: box-shadow 0.3s ease;
  @media (max-width: 480px) {
    min-height: 12vh;
    ${props =>

    props.expand &&
    css`
      min-height: 17vh;
    `}
  }
  ${props =>

    props.primary &&
    css`
      width: auto;
    `}

  ${props =>
    props.results &&
    css`
    justify-content: center;
    `}
  &:hover {
    box-shadow: 10px 10px 20px rgba(36, 36, 36, 0.5);
  }
`;

const BadgeBox = styled.div`
  width: 94vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

`;

const BoxMessage = styled.div`
  font-family: Signika;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  width: 100%;
  align-items: center;
  color: #ffffff;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 0.96em;
    line-height: 1.5em;
  }
`;

const ModalHeader = styled.h2`
  text-align: center;
  font-family: Bungee;
  font-style: normal;
  font-weight: normal;
  font-size: 2.3em;
  // line-height: 77px;
  color: #ffffff;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0;
  width: 80vw;
  padding-top: 0.5em;
  z-index: 5;
  @media (max-width: 480px) {
    font-size: 1.3em;
  }
`;

const MessageImage = styled.img`
  width: 8.2em;
  height: 7.3em;

  ${props =>
    props.bin &&
    css`
      width: 5.2em;
      height: 4.3em;
    `}

  @media (max-width: 480px) {
    width: 5.2em;
    height: 4.3em;
  }
`;

const OrangeText = styled.span`
  color: #FF8A00;
  font-family: Freckle Face;
  display: inline;
`;

const IconBin = styled.img`
  @media (max-width: 480px) {
    height: 22vh;
  }
`;
// Define shake animation
const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  60% { transform: translateX(10px); }
  70% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  90% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

// Create a styled component for the bin with the shake animation
const ShakingIconBin = styled(IconBin)`
  ${(props) =>
    props.isShaking &&
    css`
      animation: ${shakeAnimation} 0.5s;
    `}
`;


const IconImage = styled.img`
  margin-left: 4.1rem;
  height: 3.3em;
  margin-top: 0.6rem;
  cursor: pointer;
  position: relative; /* Changed to relative for top positioning */
  top: 3.8%;

  ${props =>
    props.heart &&
    css`
      /* Specific styles for when 'game' prop is true */
      margin-top: 0rem; /* Consistent with above media query */
    `}

  @media (max-width: 768px) {
    margin-top: 0;
    margin-left: 0.1rem;
    height: 2.3em;

    ${props =>
      props.game &&
      css`
        /* Specific styles for when 'game' prop is true */
        height: 2.3em; /* Consistent with above media query */
      `}
  }

  @media (max-width: 480px) {
    top: 0; /* Adjusted to remove percentage-based positioning */
    margin-left: 0.1rem;
    height: 2.8em; /* Slight adjustment for better fit */

    ${props =>
      props.game &&
      css`
        /* Specific styles for when 'game' prop is true */
        height: 2.5em; /* Consistent with above media query */
      `}
  }
`;

const CloseCross = styled.img`
  left: 3%;
  height: 3.3em;
  margin-bottom: 18px;
  position: fixed;
  cursor: pointer;
  padding-bottom: -11px;
  top: 3.2%;
  @media (max-width: 768px) {
    height: 2.3em;
    top: 3.2%;

  }
  @media (max-width: 480px) {
    left: 3%;
  }
`;
const PlayIcon = styled.img`
  left: 1%;
  height: 3.3em;

  position: fixed;
  cursor: pointer;
  top: 4.2%;
  @media (max-width: 768px) {
    height: 2.3em;
    left: 1%;

  }
  @media (max-width: 480px) {
    left: 1%;
    top: 2.5%;
  }
`;
const Spacer = styled.div`
width: 2.5vw;
padding-bottom:4.5vh;
`
export {
  Container,
  PageHeader,
  MessageBox,
  BadgeBox,
  BoxMessage,
  ModalHeader,
  MessageImage,
  OrangeText,
  CloseCross,
  Paragraph,
  IconImage,
  IconBin,
  ShakingIconBin,
  Spacer,
  PlayIcon,
  PageTitle,
  Wrapper
};
