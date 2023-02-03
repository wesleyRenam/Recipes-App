import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.primary};

  div {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
  }

  svg {
    font-size: 40px;
    color: ${({ theme }) => theme.secondary};
  }
`;
