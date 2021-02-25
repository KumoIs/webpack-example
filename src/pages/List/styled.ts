import styled from '@emotion/styled';


export const Layout = styled.div`
  font-family: sans-serif;
  padding-left: 256px;
  width: 100%;
  height: 100%;
  background: royalblue;
  .x6-graph-scroller {
    border: 1px solid #f30606;
    margin-left: -1px;
  }
`;

export const DndWarp = styled.div`
  width: 256px;
  height: 100%;
  min-height: 100%;
  margin-right: -100%;
  position: relative;
  right: 256px;
  display: flex;
  flex-direction: column;
  div {
    align-self: center;  
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow: auto;
  box-shadow: 0 0 10px 1px #312929;
`

export const Node = styled.div`
  width: 100px;
  height: 40px;
  border: 2px solid #31d0c6;
  text-align: center;
  line-height: 40px;
  margin: 16px;
  cursor: move;
`

export const Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 2px solid #31d0c6;
  text-align: center;
  line-height: 60px;
  margin: 16px;
  cursor: move;
`