import '@emotion/react';
import { colors } from 'parameters';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
  }
} 