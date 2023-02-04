import styled from 'styled-components';

export const DoneContainer = styled.div`
  width: 160px;
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

  h1 {
    text-align: center;
  }

  h2 {
    padding: 10px;
    font-weight: 400;
    font-size: 16px;
  }
`;
