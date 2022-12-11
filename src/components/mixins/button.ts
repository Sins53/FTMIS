import { css } from 'styled-components';

export const buttonVariantStyle = (variant: 'outlined' | 'contained' | 'text') => {
  switch (variant) {
    case 'contained':
      return css`
        display: inline-flex;
      `;
    case 'outlined':
      return css`
        color: $color;
        border-color: $color;
        &:hover {
          color: $color-hover;
          background-color: $active-background;
          border-color: $active-border;
        }

        .btn-check:focus + &,
        &:focus {
          box-shadow: 0 0 0 $btn-focus-width rgba($color, 0.5);
        }

        .btn-check:checked + &,
        .btn-check:active + &,
        &:active,
        &.active,
        &.dropdown-toggle.show {
          color: $active-color;
          background-color: $active-background;
          border-color: $active-border;

          &:focus {
          }
        }

        &:disabled,
        &.disabled {
          color: $color;
          background-color: transparent;
        }
      `;
    default:
      return css``;
  }
};
