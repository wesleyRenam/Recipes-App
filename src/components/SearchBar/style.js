import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 95%;
  height: 20vh;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 15px;

  > input {
    width: 100%;
    height: 35%;
    padding: 1rem;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;

    &::placeholder {
      font-weight: 600;
      font-size: 14px;
    }
  }

  > button {
    width: 80%;
    height: 25%;
    margin-bottom: 5px;
    border-radius: 5px;
    border: none;
    outline: none;
    background: ${({ theme }) => theme.secondary};
    color: white;
    font-size: 18px;
    font-weight: 700;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  font-size: .9rem;

  span {
    margin-left: 5px;
    color: white;
  }
`;
