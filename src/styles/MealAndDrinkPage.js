import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 15vh;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

`;

export const AllButton = styled.div`
 > button {
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
      
    }

    > span {
    color: #ccc;
    font-size: 10px;
    margin-top: 5px;
  }
`;

export const RecipesContainer = styled.div`
  gap: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
