export function ItemBox({ children }: React.PropsWithChildren) {
  return (
    <div className='flex w-full flex-col p-4 rounded-md shadow-md bg-blue-950'>{children}</div>
  );
}
