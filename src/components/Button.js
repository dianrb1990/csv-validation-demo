import styled from 'styled-components';

export const Button = styled.button`
  margin: 0.5em;
  padding: 0.8em 0.5em;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #000;
  color: #fff;
  min-width: 120px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
