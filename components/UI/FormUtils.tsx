import React, { forwardRef } from 'react';
import { ReactNode } from 'react';

export const Group = ({ children }: React.PropsWithChildren) => {
  return <div className='flex flex-col gap-1'>{children}</div>;
};

export const Label = ({ children }: React.PropsWithChildren) => {
  return <label className='text-sm uppercase font-semibold text-slate-600'>{children}</label>;
};

export const Input = forwardRef((props: React.ComponentProps<'input'>, ref: TODO) => {
  return (
    <input
      ref={ref}
      className='rounded-md px-4 py-2 text-xl text-slate-700 md:min-w-[400px] border border-slate-200 w-full'
      {...props}
    />
  );
});

export const Textarea = forwardRef((props: React.ComponentProps<'textarea'>, ref: TODO) => {
  return (
    <textarea
      spellCheck={false}
      ref={ref}
      className='rounded-md px-4 py-2 text-xl text-slate-700 md:min-w-[400px] border border-slate-200 w-full resize-none'
      {...props}
    />
  );
});

export const Select = ({ children, ...props }: React.ComponentProps<'select'>) => {
  return (
    <select
      {...props}
      className='rounded-md px-4 py-2 text-xl md:min-w-[400px] border border-slate-200'>
      {children}
    </select>
  );
};

export const InputSubLabel = ({ children }: React.PropsWithChildren) => {
  return <div className='w-full text-sm text-slate-500'>{children}</div>;
};

export const InputDescription = ({ children }: React.PropsWithChildren) => {
  return (
    <InputSubLabel>
      <span>{children}</span>
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
    <div className='flex flex-col gap-1'>
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
      className='border-[2px] border-slate-200 rounded-lg flex flex-col relative overflow-hidden'>
      <legend className='px-2 font-semibold text-lg'>{legend}</legend>
      <div className='flex flex-col gap-4 p-2'>{children}</div>
    </fieldset>
  );
};
