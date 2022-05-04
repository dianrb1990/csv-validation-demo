import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: ${(props) => (props.margin ? props.margin : '0')};
`;
