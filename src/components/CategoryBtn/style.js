import styled from 'styled-components';

export const CategoryButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  > span {
    color: #ccc;
    font-size: 10px;
    margin-top: 5px;
  }
`;

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  background: none;
  color: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 50%;
  width: 50px;
  height: 50px;

  cursor: pointer;
`;
