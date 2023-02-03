import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100vw;
  height: ${(props) => (props.isSearch ? '40vh' : '17vh')};
  margin-bottom: 1rem;

  h1 {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  width: 100vw;
  padding: 1.5rem;
  height: 8vh;
  background-color: ${({ theme }) => theme.secondary};

`;
