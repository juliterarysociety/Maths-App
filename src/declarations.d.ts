declare module 'react-katex' {
  import * as React from 'react';

  export interface KatexProps {
    math?: string;
    children?: React.ReactNode;
    renderError?: (error: Error | TypeError) => React.ReactNode;
    as?: string;
    errorColor?: string;
  }

  export const InlineMath: React.FC<KatexProps>;
  export const BlockMath: React.FC<KatexProps>;
}

declare module 'jsxgraph' {
  const JXG: any;
  export default JXG;
  export const JSXGraph: any;
}
