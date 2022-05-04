import styled from 'styled-components';

export const Text = styled.p`
  color: ${(props) => (props.color ? props.color : '#000')};
  font-size: ${(props) => (props.size ? props.size : '14px')};
  margin: ${(props) => (props.margin ? props.margin : '5px')};
  width: ${(props) => (props.width ? props.width : 'auto')};
`;
