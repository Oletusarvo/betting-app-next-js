export function TopLabel({ children, labelText }: React.PropsWithChildren & { labelText: string }) {
  return (
    <div className='flex flex-col'>
      <small className='text-sm w-full text-right'>{labelText}</small>
      <div className='text-right'>{children}</div>
    </div>
  );
}
