import styled from 'styled-components';

const CustomButton = styled.image`

  svg {
    font-size: ${(props) => props.size};
    color: ${(props) => props.theme[props.color]};
  }

`;

export default CustomButton;
