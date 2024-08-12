export function TopLabel({
  children,
  labelText,
  labelPosition = 'left',
}: React.PropsWithChildren & { labelText: string; labelPosition?: 'left' | 'center' | 'right' }) {
  const labelClasses = ['text-sm w-full', `text-${labelPosition}`];
  return (
    <div className='flex flex-col'>
      <small className={labelClasses.join(' ')}>{labelText}</small>
      <div className={`text-${labelPosition}`}>{children}</div>
    </div>
  );
}
