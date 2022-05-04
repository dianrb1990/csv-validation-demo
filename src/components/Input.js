import styled from 'styled-components';

export const Input = styled.input.attrs(({ type }) => ({
  type: type,
}))`
  padding: 0.8em 0.5em;
  margin: 0.5em;
  border: 1px solid #000;
  border-radius: 10px;
  width: ${(props) => (props.width ? props.width : '30%')};
`;
