import styled from 'styled-components';

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 20px;
  border-radius: 20px;
  width: '50%';
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: white;

  border: 1px solid black;

  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  @keyframes appear {
    from {
      top: -50%;
      opacity: 0;
    }
    to {
      left: 50%;
      opacity: 1;
    }
  }
`;
