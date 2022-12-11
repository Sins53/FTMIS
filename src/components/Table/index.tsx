import { LIGHT_THEME_ID } from '@/theme';
import styled, { DefaultTheme } from 'styled-components';
import { Box, FlexBox, Text } from '../core';
import { TableSize } from './DataTable';
import { tablePropertyStyles } from './tableProps';

interface TableProps {
  size?: TableSize;
  striped?: boolean;
}

export const TableContainer = styled(FlexBox)`
  background-color: ${(props) => props.theme.color.surface};
  width: 100%;
  height: 100%;
`;

export const MoreIcon = styled.i`
  color: ${(props) => props.theme.color.component.table.text};
`;

export const StyledTable = styled(Box)<TableProps>`
  width: 100%;
  position: relative;
  flex-grow: 1;
  table {
    width: 100%;
    vertical-align: top;
    thead,
    .thead,
    .thead > * > * {
      color: ${(props) => props.theme.color.onBackground};
      background-color: ${(props) => props.theme.color.surface};
      padding: ${tablePropertyStyles.headerPadding};
      position: sticky;
      top: 0;
      th,
      .th {
        font-weight: ${tablePropertyStyles.headerFontWeight};
        font-size: ${tablePropertyStyles.headerFontSize};
        color: ${(props) => props.theme.color.primary};
        padding: 0.5rem;
        border-top: none;
        vertical-align: middle;
        border-bottom: 1px solid ${(props) => props.theme.color.border};
        white-space: nowrap;
      }
    }
    tbody,
    .tbody,
    .tbody > * > * {
      border-top: 0 !important;
      tr,
      .tr {
        &:nth-child(even) {
          background-color: ${(props) => props.theme.color.component.table.alternate};
        }
        td,
        .td {
          font-size: ${tablePropertyStyles.bodyFontSize};
          color: ${(props) => props.theme.color.component.table.text};
          padding: ${tablePropertyStyles.bodyPadding};
          height: 2.75rem;
        }
        &:last-child {
          td,
          .td {
            border-bottom-color: transparent !important;
          }
        }
      }
    }
    tfoot,
    .tfoot {
      background-color: ${(props) => props.theme.color.surface};
      color: ${tablePropertyStyles.footerColor};
      tr,
      .tr {
        td,
        .td {
          font-size: ${tablePropertyStyles.footerFontSize};
          padding: ${tablePropertyStyles.footerPadding};
        }
      }
    }
  }
`;

export const PaginationWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.color.surface};
  border-top: 1px solid ${(props) => props.theme.color.border};
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  width: 100%;
`;

export const TableText = styled(Text)`
  color: ${(props) => props.theme.color.onBackground};
`;

export const getBaseColor = (theme: DefaultTheme) => {
  if (theme.id === LIGHT_THEME_ID) {
    return theme.color.primary;
  } else {
    return '#fff';
  }
};
export const ThemedText = styled(Text)`
  color: ${(props) => getBaseColor(props.theme)};
`;
