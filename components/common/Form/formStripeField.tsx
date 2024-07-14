import React, { useRef, useImperativeHandle, ForwardRefRenderFunction } from 'react';

interface FormStripeFieldProps {
  component: React.ElementType;
  inputRef?: React.Ref<any>;
  [key: string]: any;
}

const FormStripeField: ForwardRefRenderFunction<any, FormStripeFieldProps> = ({ component: Component, inputRef, ...props }, ref) => {
  const elementRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current?.focus()
  }));

  useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current?.focus()
  }));

  return (
    <Component
      onReady={(element: any) => (elementRef.current = element)}
      {...props}
    />
  );
};

export default React.forwardRef(FormStripeField);

