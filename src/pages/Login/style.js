import styled from 'styled-components';

export const LoginContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 90vh;
  gap: 1rem;
`;

export const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 1rem;
  border-radius: 25px;
  width: 15rem;
  outline: none;
  color: ${({ theme }) => theme.primary};

  &::placeholder {
    color: ${({ theme }) => theme.primary}
  }

`;

export const Button = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.primary};
  padding: 1rem;
  border-radius: 25px;
  width: 15rem;

  color: white;
  font-weight: 700;

  &:disabled {
    background-color: ${({ theme }) => theme.gray};
    color: #ccc;
  }

`;
