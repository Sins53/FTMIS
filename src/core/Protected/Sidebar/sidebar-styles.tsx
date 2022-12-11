import { Box, Text } from '@/components/core';
import { Panel } from '@/components/derived';
import Button from '@/components/derived/Buttons/Buttons';
import { LIGHT_THEME_ID } from '@/theme';
import { base, blue, coolGray, gray } from '@/theme/colors';
import { NavLink } from 'react-router-dom';
import styled, { css, DefaultTheme } from 'styled-components';
interface Props {
  inner: string;
  toggle?: boolean;
  ariaExpanded?: boolean;
}
export const SidebarPanel = styled(Panel)<Partial<Props>>`
  margin-left: ${(props) => props.toggle && 'calc(-1 * var(--sidebar-width))'};
  background-color: ${coolGray[200]};
  display: flex;
  flex-direction: column;
`;

export const ItemContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem 1.5rem 1rem;
  border-radius: 0.5rem;
}
`;

export const ShortcutButton = styled(Button)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background-color: white;
  padding: 0;
  margin-left: auto;
`;

export const LeftContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;
export const RightContainer = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
`;
export const UserContainer = styled(Box)`
  background-color: ${base.white};
  border: 1px solid ${gray[100]};
  border-radius: 2rem;
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
`;

const getBaseColor = (theme: DefaultTheme) => {
  if (theme.id === LIGHT_THEME_ID) {
    return theme.color.primary;
  } else {
    return '#fff';
  }
};

const getBackgroundColor = (theme: DefaultTheme) => {
  if (theme.id === LIGHT_THEME_ID) {
    return theme.color.primary;
  } else {
    return coolGray[600];
  }
};

export const ApplicationTitle = styled(Text)`
  color: ${(props) => getBaseColor(props.theme)};
  margin-left: 1rem;
  font-weight: 600;
`;

const defaultLinkStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 100%;
  font-size: 0.875rem;
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: ${(props) => props.theme.color.onBackground};
  i,
  svg {
    display: inline-flex;
    align-items: center;
    font-size: 1.125rem;
    margin-right: 0.75rem;
  }
`;
const childrenStyle = css<Partial<Props>>`
  &:after {
    content: '\\e90e';
    display: block;
    font-family: 'icomoon';
    margin-left: auto;
    font-size: 0.75rem;
  }
  ${(props) => {
    return (
      props.ariaExpanded &&
      `  color: ${getBaseColor(props.theme)} ;
      //  background-color:${props.theme.color.surface};
    &:after {
      content: '\\e912';
    }

    `
    );
  }}
`;

export const Menu = styled.ul<Partial<Props>>`
  list-style: none;
  padding: 0;
  margin: 0;
  // flex-grow: 1;
  margin: 0.5rem 1rem 0 1rem;

  > li > a {
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;

    font-size: 0.875rem;

    &:hover {
      color: ${(props) => getBaseColor(props.theme)};
    }

    &.active {
      color: ${base.white};
      background-color: ${(props) => getBaseColor(props.theme)};
      border-radius: 0.5rem;
    }
  }
`;
export const NestedMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 1.5rem;
  // background-color: ${(props) => props.theme.color.surface};
  border-left: 1px solid ${coolGray[400]};
  > li > a {
    padding: 0.75rem;
    margin-left: 0.75rem;
    position: relative;

    &:hover {
      color: ${(props) => getBaseColor(props.theme)};
      background-color: ${blue[300]};
      border-radius: 0.25rem;
    }

    &.active {
      background-color: ${(props) => getBackgroundColor(props.theme)};
      color: #fff;
      border-radius: 0.5rem;
      &:hover {
        color: #fff;
      }
    }
  }
`;

export const MenuItem = styled(NavLink)<Partial<Props>>`
  ${defaultLinkStyle}
`;
export const MenuLanguage = styled.div<Partial<Props>>`
  ${defaultLinkStyle}
  &:hover {
    cursor: pointer;
  }
`;
export const CollapseToggler = styled.a<Partial<Props>>`
  ${defaultLinkStyle};

  {
    ${(props) => {
      return props.inner ? childrenStyle : '';
    }}
`;

export const Icon = styled.i`
  font-size: 1.25rem;
  margin-right: 0.7rem;
`;
