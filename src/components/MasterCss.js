import styled, { css } from "styled-components";
import { ReactComponent as Cross } from "../assets/x-button.svg";


const Container = styled.div`
  background-image: linear-gradient(#21b2d3, #7abefd);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
`;

const PageHeader = styled.h1`
  font-family: Freckle Face;
  font-style: normal;
  font-weight: normal;
  font-size: 64px;
  line-height: 79px;
  text-align: center;
  color: #ff8a00;
  -webkit-text-stroke: 2px black;
  text-transform: uppercase;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin-block-end: 0px;
  display: inline;

`;

const MessageBox = styled.div`
  width: 50vw;
  min-height: 20vh;
  border-radius: 25px;
  background-color: #08345c;
  color: white;
  padding: 35px;
  margin: 1em;
  display:flex;
  flex-direction: row;
  align-items: center;

  ${props =>

    props.primary &&
    css`
      width: auto;
    `}

  ${props =>

    props.bin &&
    css`
      width: 55vw;
      text-align: center;

    `}
`;

const BadgeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const BoxMessage = styled.p`
  font-family: Signika;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 50px;
  align-items: center;
  color: #ffffff;
  padding-left: 0.5em;
`;

const ModalHeader = styled.h2`
  text-align: center;
  font-family: Bungee;
  font-style: normal;
  font-weight: normal;
  font-size: 64px;
  line-height: 77px;
  color: #ffffff;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0;
  width: 80vw;
  padding-top: 0.5em;
`;

const MessageImage = styled.img`
  width: 200px;
  height: 200px;

  ${props =>
    props.bin &&
    css`
      width: 100px;
      height: 100px;
    `}
`;

const OrangeText = styled.p`
  color: #FF8A00;
  display: inline;
`;

const StickyCross = styled(Cross)`
  position: absolute;
  left: 1.42%;
  right: 90.87%;
  top: 2.04%;
  bottom: 86.95%;
  position: sticky;
`;

export {
  Container,
  PageHeader,
  MessageBox,
  BadgeBox,
  BoxMessage,
  ModalHeader,
  MessageImage,
  OrangeText,
  StickyCross
};
