import styled from '@emotion/styled';

export const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template:
    [header-left] 'header header' 48px [header-right]
    [main-left] 'side  main' auto [main-right]
    [footer-left] 'footer  footer' 48px [footer-right]
    / 236px auto;
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
  height: 100%;
  overflow: auto;
  grid-area: main;
  background-color: #eaeae2;
  box-sizing: content-box;
`;

export const Side = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
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
