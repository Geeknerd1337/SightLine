import { Interpolation } from '@emotion/react';

interface DefaultTheme {}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: Interpolation<DefaultTheme>;
  }
}