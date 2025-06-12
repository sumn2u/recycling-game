import React from 'react';
import styled from "styled-components";

// Styled container for SVG to be responsive
const StyledSvgContainer = styled.div`
  position: relative;
  width: 100vw;
`;

// Styled SVG component
const StyledSvg = styled.svg`
  width: 100%;
  height: auto;
  display: block;
  width: 120vw;
`;

const ResponsiveSvg = ({ SvgComponent }) => {
  return (
    <StyledSvgContainer>
      <StyledSvg as={SvgComponent} />
    </StyledSvgContainer>
  );
};

export default ResponsiveSvg;
