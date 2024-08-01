export function ContentContainer({ children }: React.PropsWithChildren) {
  return (
    <div className='flex flex-col h-screen justify-center lg:items-start xs:items-center'>
      {children}
    </div>
  );
}
