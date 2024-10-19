import React, { useRef, useImperativeHandle, ForwardRefRenderFunction } from 'react';

interface FormStripeFieldProps<T = HTMLElement> {
  component: React.ElementType;
  inputRef?: React.Ref<T>;
  [key: string]: unknown; // Use `unknown` for extra props instead of `any`
}

type RefType<T> = T & {
  focus: () => void;
};

const FormStripeField: ForwardRefRenderFunction<RefType<HTMLElement>, FormStripeFieldProps> = (
  { component: Component, inputRef, ...props },
  ref
) => {
  const elementRef = useRef<HTMLElement | null>(null); // Refers to the actual DOM element

  useImperativeHandle(ref, () => ({
    ...elementRef.current, // Spread all properties from the actual element
    focus: () => elementRef.current?.focus(),
  }));

  useImperativeHandle(inputRef, () => ({
    ...elementRef.current, // Spread all properties from the actual element
    focus: () => elementRef.current?.focus(),
  }));

  return (
    <Component onReady={(element: HTMLElement) => (elementRef.current = element)} {...props} />
  );
};

export default React.forwardRef(FormStripeField);
