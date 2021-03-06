import styled from '@emotion/styled';

export const Layout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template:
    [header-left] 'header header' 48px [header-right]
    [main-left] 'side  main' 1fr [main-right]
    [footer-left] 'footer  footer' 48px [footer-right]
    / 236px 1fr;
`;

export const Header = styled.div`
  grid-area: header;
  background-color: azure;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  width: 100%;
  grid-area: main;
  background-color: #eaeae2;
  box-sizing: content-box;
`;

export const Side = styled.div`
  grid-area: side;
  background-color: #bcbbba;
`;

export const Footer = styled.div`
  grid-area: footer;
  background-color: azure;
  display: flex;
  justify-content: center;
  align-items: center;
`;
