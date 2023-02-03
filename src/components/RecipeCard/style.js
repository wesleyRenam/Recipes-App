import styled from 'styled-components';

export const RecipeCardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  
  img {
    width: 100vw;
  }

`;

export const IngredientsContainer = styled.div`
  width: 80%;
  margin: auto;

  h1 {
    text-align: center;
    padding: 20px;
  }

  h4 {
    margin-bottom: 20px;
  }

  ul {
    margin-bottom: 20px;
  }

  embed {
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;
    height: 40vh;
  }
`;
