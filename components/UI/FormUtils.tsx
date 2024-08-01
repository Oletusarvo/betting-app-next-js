import React, { forwardRef } from 'react';
import { ReactNode } from 'react';

export const Group = ({ children }: React.PropsWithChildren) => {
  return <div className='flex flex-col gap-1'>{children}</div>;
};

export const Label = ({ children }: React.PropsWithChildren) => {
  return <label className='text-base'>{children}</label>;
};

export const Input = forwardRef((props: React.ComponentProps<'input'>, ref: TODO) => {
  return (
    <input
      ref={ref}
      className='rounded-md px-4 py-2 text-xl text-blue-800 md:min-w-[400px] border border-slate-300 w-full'
      {...props}
    />
  );
});

export const Select = ({ children, ...props }: React.ComponentProps<'select'>) => {
  return (
    <select
      {...props}
      className='rounded-md px-4 py-2 text-xl text-blue-800 md:min-w-[400px] border border-slate-300'>
      {children}
    </select>
  );
};

export const InputSubLabel = ({ children }: React.PropsWithChildren) => {
  return <div className='w-full text-sm'>{children}</div>;
};

export const InputDescription = ({ children }: React.PropsWithChildren) => {
  return (
    <InputSubLabel>
      <span className='text-white'>{children}</span>
    </InputSubLabel>
  );
};

export const InputError = ({ children }: React.PropsWithChildren) => {
  return (
    <InputSubLabel>
      <span className='text-red-500'>{children}</span>
    </InputSubLabel>
  );
};

type FormControlProps = {
  label: string;
  control: React.ReactElement;
  required?: boolean;
  helper?: ReactNode;
};
export const FormControl = ({ label, control, helper, required }: FormControlProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <Label>{label}</Label>
      {React.cloneElement(control, {
        ...control.props,
        required,
      })}
      {helper}
    </div>
  );
};

export const Fieldset = ({
  children,
  legend,
  ...props
}: React.ComponentProps<'fieldset'> & {
  legend: string;
}) => {
  return (
    <fieldset
      {...props}
      className='border border-blue-900 p-2 rounded-md flex flex-col gap-4 bg-blue-950'>
      <legend className='mx-2 font-semibold'>{legend}</legend>
      {children}
    </fieldset>
  );
};
