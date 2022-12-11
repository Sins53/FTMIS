import { css } from 'styled-components';

export const scroll = css`
  overflow: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #e9ecef;
    border-radius: 4px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #adb5bd;
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #adb5bd;
    cursor: pointer;
  }
`;
