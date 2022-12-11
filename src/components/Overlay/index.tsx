import React from 'react';
// import { Modal } from 'reactstrap';

import { Modal } from 'reactstrap';
import styled from 'styled-components';
// import styled, { css } from 'styled-components';

import { Scrollable } from '../core/Scrollable';
import { overlayStyles } from './overlayProps';

interface Props {
  toggle?: () => void;
  children?: React.ReactNode;
  width?: string;
  isOpen?: boolean;
  fade?: boolean;
}

const OverLayModal = styled(Modal)<Props>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${overlayStyles.overlayWidth};
  height: 100%;
  background-color: ${overlayStyles.overlayBgColor};
  flex-shrink: 0;
  max-height: 100%;
  margin: 0;
  transition: margin 0.2s ease-in;
  // transform: translateX(${(props) => (props.isOpen ? 'calc(-1 * -30rem)' : 0)});
  // transition: all 0.3s ease-in-out;

  ${Scrollable},
  .toggle {
    transform: translateX(${overlayStyles.overlayWidth});
  }
`;
// export const StyledSidebar = styled(OverLayModal)<Partial<Props>>`
//   margin-left: ${(props) => props.toggle && 'calc(-1 * var(--sidebar-width))'};
//   background-color: ${(props) => props.theme.color.primary};
// `;

export default function Overlay(props: Props) {
  const { children, isOpen, toggle, width } = props;

  return (
    <OverLayModal isOpen={isOpen} toggle={toggle} fade={false} width={width}>
      {children}

      {/* <StyledOverlay toggle={toggle} width={width}>
        {children}
      </StyledOverlay> */}
    </OverLayModal>
  );
}
