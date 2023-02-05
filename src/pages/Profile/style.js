import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 2rem;

  a {
    text-decoration: none;
  }

  button {
    width: 40%;
    height: 50px;
    border: none;
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
    font-size: 16px;
  }

`;
