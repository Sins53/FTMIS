import React from 'react';
import styled from 'styled-components';
import { Box } from '../core';

interface Props {
  bgColor?: string;
  placeholder?: string;
  color?: string;
}

const Search = styled(Box)<Props>`
  input {
    border-color: ${(props) => (props.bgColor ? props.theme.color.primary : 'white')};
    background-color: ${(props) => (props.bgColor ? props.theme.color.primary : 'white')};
    color: ${(props) => (props.color ? props.color : props.theme.color.secondary)};
    &::placeholder {
      color: white;
    }
    &:focus {
      border-color: ${(props) => (props.bgColor ? props.theme.color.primary : 'white')};
      background-color: ${(props) => (props.bgColor ? props.theme.color.primary : 'white')};
      color: white;
    }
  }
`;

function SearchBar({ bgColor, placeholder, color }: Props): React.ReactElement {
  return (
    <Search bgColor={bgColor} color={color}>
      <div className="form-control-icon rft">
        <input type="text" className="form-control" placeholder={placeholder} color="white" />
        <i className="ic-search"></i>
      </div>
    </Search>
  );
}

export default SearchBar;
