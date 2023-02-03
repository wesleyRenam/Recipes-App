import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  width: 95vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  button {
    margin: 25px;
    width: 80%;
    height: 50px;
    border: none;
    background-color: ${({ theme }) => theme.secondary};
    color: white;
    font-weight: 700;
    font-size: 18px;
    border-radius: 5px;
  }
`;
