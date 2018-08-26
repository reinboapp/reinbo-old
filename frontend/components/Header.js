// import Link from 'next/link'
// import { withRouter } from 'next/router'
import styled from "styled-components";

const Wrapper = styled.header`
  width: 100%;
  padding: 10px;
  /* background: tomato; */
  padding: 0;
`;
const Logo = styled.div``;
const Container = styled.div`
  height: 60px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = props => (
  <div>
    <Wrapper>
      <Container>
        <Logo>Reinbo</Logo>
      </Container>
    </Wrapper>
  </div>
);

export default Header;
