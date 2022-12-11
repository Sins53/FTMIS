import { coolGray, green } from '@/theme/colors';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  scrollable?: boolean;
}
export const List = styled.ul<Props>`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

export const ListItem = styled.li`
  flex-shrink: 0;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

export const TabLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${coolGray[600]};
  font-weight: 400;

  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  &.active {
    background-color: ${green[100]};
    color: ${green[800]};
    font-weight: 600;
    border-radius: 0.25rem;
  }
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${coolGray[600]};
  font-weight: 400;

  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  &.active {
    background-color: ${green[100]};
    color: ${green[800]};
    font-weight: 600;
    border-radius: 0.25rem;
  }
`;
