import styled from '@emotion/styled';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
`;

export const Header = styled.div`
  background: rgba(29, 27, 27, 0.726);
  text-align: center;
  height: 48px;
  line-height: 46px;
`;

export const Main = styled.div`
  width: 100%;
  min-height: calc(100% - 96px);
  height: calc(100% - 96px);
  padding-left: 256px;
  overflow: auto;
  div {
    float: left;
  }
`;

export const Middle = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100%;
  background: rgb(206, 201, 201);
  overflow: auto;
  .content {
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow: auto;
  }
`;

export const Side = styled.div`
  width: 256px;
  height: 100%;
  min-height: 100%;
  margin-left: -100%;
  position: relative;
  right: 256px;
  background: rgba(95, 179, 235, 0.972);
`;

export const Footer = styled(Header)`
  clear: both;
`;
