import styled from 'styled-components';

const StyledHeader = styled.h1`
  color: #4f4f4f;
  font-size: 42px;
`;

const StyledData = styled.p`
  color: #3f3f3f;
  font-size: 24px;
  margin: 0;
  padding: 8px 0;
`;

function App() {
  return (
    <div>
      <StyledHeader>Diego Filastro</StyledHeader>
      <StyledData>diego@email.com</StyledData>
      <StyledData>(99) 999-999.999</StyledData>
      <StyledData>Brasil</StyledData>
    </div>
  );
}

export default App;
