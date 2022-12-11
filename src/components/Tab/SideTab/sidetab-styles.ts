import styled from 'styled-components';
import { NavLink as RNavLink } from 'reactstrap';

export const NavLink = styled(RNavLink)`
  background: none;
  border: none;
  color: ${(props) => props.theme.color.onSurface};
  font-size: 1rem;
  padding: 0.75rem 1rem;
  font-weight: 400;
  cursor: pointer;
  &.active {
    color: #015426;
    background: #bbf7d0;
    font-weight: 600;
    border-left: 2px solid ${({ theme }) => theme.color.primary};
  }
`;
