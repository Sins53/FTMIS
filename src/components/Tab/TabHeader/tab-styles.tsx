import styled from 'styled-components';
import { Nav as RNav, NavItem as RNavItem, NavLink as RNavLink } from 'reactstrap';

export const Nav = styled(RNav)`
  border: none;
  flex-wrap: nowrap;
`;
export const NavItem = styled(RNavItem)`
  &:not(:last-child) {
    .nav-link {
      margin-right: 1.5rem;
    }
  }
`;
export const NavLink = styled(RNavLink)`
  background: none;
  border: none;
  color: ${(props) => props.theme.color.onSurface};
  font-size: 1rem;
  padding: 0.75rem 0;
  font-weight: 400;
  cursor: pointer;
  &.active {
    color: ${({ theme }) => theme.color.primary};
    background: none;
    font-weight: 600;
    border-bottom: 2px solid ${({ theme }) => theme.color.primary};
  }
`;
