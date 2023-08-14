import styled from 'styled-components';

const Wrapper = styled.header`
  padding: 0 var(--globalPaddingLr);
  margin: auto;
  width: 100%;
  max-width: var(--globalContainer);
`;

const LogoStyle = styled.div`
  font-size: var(--baseXL);
  color: var(--primaryColor);
  line-height: var(--bodyLineHeight);
`;

const Container = styled.div`
  width: 100%;
  padding: var(--globalPaddingLr) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--dividerColor);
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: var(--gapXL);

  & li a {
    color: var(--headingsColor);
    transition: color 0.1s linear;
    font-weight: 600;
    &:hover {
      color: var(--primaryColor);
    }
  }

  @media (max-width: 860px) {
    column-gap: var(--gapL);
  }
`;

const Right = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: var(--gapRegular);

  @media (max-width: 768px) {
    grid-template-columns: auto auto auto;
  }
`;

const GradientText = styled.span`
    background: linear-gradient(45deg, #3498db, #8e44ad);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline; /* Ensures the background only takes up the space of the text */
`;


const VerticalDivider = styled.span`
  height: 100%;
  width: var(--borderSmall);
  background: var(--dividerColor);
  display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'block')};

  @media (max-width: 768px) {
    display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'block')};
  }
`;

const DonateWrapper = styled.div`
    background-color: #99ff66;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s;
    display: inline-block;

    &:hover {
        background-color: #2c80b9;
    }

    a {
        color: inherit; // to ensure the link inside inherits the color
        text-decoration: none;
    }
`;

export { Wrapper, Container, Nav, NavList, Right, VerticalDivider, LogoStyle, GradientText, DonateWrapper };
