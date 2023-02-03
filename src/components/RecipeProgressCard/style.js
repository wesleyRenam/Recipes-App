import styled from 'styled-components';

export const RecipeCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  
  img {
    width: 100vw;
    max-height: 40vh;
  }

  h1 {
    margin: 25px;
  }

  p {
    margin: 25px;
  }

`;

export const IngredientsContainer = styled.div`
  display: flex;
  width: 80%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  label {
    input {
      margin-right: 15px;
    }
  }
`;
