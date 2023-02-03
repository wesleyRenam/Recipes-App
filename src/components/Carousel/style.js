import styled from 'styled-components';

export const CarouselContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;
  height: 200px;
  overflow-x: scroll;
  text-align: center;
  width: 80%;
  margin: auto;

  > div {
  width: 160px;
  height: 180px;
  border: 1px solid #ccc;
  border-radius: 5px;
  

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
  }
  
  img {
    border-radius: 5px 5px 0px 0px;
    width: 158px;
    height: 135px;
  }

  h2 {
    padding: 10px;
    font-weight: 400;
    font-size: 16px;
  }
  }
`;
