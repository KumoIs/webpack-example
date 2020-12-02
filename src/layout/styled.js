import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
`;

export const Header = styled.div`
  background: rgba(29, 27, 27, 0.726);
  text-align: center;
  height: 48px;
  line-height: 46px;
`;

export const Main = styled.div`
  min-height: calc(100% - 96px);
  height: calc(100% - 96px);

  div {
    float: left;
  }
`;

export const Middle = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100%;
  background: rgb(206, 201, 201);
  .content {
    margin-left: 256px;
  }
`;

export const Side = styled.div`
  width: 256px;
  margin-left: -100%;
  min-height: 100%;
  height: 100%;
  background: rgba(95, 179, 235, 0.972);
`;

export const Footer = styled(Header)``;
