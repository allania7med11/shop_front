import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { InputBaseComponentProps } from '@mui/material/InputBase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StripeInput = React.forwardRef<any, InputBaseComponentProps>(
  function StripeInput(props, ref) {
    const { component: Component, options, ...other } = props;
    const theme = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [mountNode, setMountNode] = React.useState<any | null>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => mountNode.focus(),
      }),
      [mountNode]
    );

    return (
      <Component
        onReady={setMountNode}
        options={{
          ...options,
          style: {
            base: {
              color: theme.palette.text.primary,
              fontSize: '16px',
              lineHeight: '1.4375em', // 23px
              fontFamily: theme.typography.fontFamily,
              '::placeholder': {
                color: alpha(theme.palette.text.primary, 0.42),
              },
            },
            invalid: {
              color: theme.palette.text.primary,
            },
          },
        }}
        {...other}
      />
    );
  }
);

export default StripeInput;
