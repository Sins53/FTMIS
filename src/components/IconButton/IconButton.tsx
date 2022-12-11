import React from 'react';
import styled from 'styled-components';

interface Props {
  icon?: string;
  color?: string;
  ghost?: boolean;
}

const Button = styled.a<Props>`
  color: ${(props) => props.color};
`;

function IconButton({ icon, color, ghost }: Props): React.ReactElement {
  return (
    <Button color={color} ghost={ghost}>
      <i className={icon}></i>
    </Button>
  );
}

export default IconButton;
