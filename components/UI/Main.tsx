export function Main({ children }: React.PropsWithChildren) {
  return (
    <main className='h-full flex flex-col text-white xs:mx-2 md:mx-80 pb-16 gap-2'>{children}</main>
  );
}

export function MobileMain({ children }: React.PropsWithChildren) {
  return (
    <main className='flex flex-col gap-2 w-full h-full p-2 bg-white pb-20 oveflow-hidden overflow-y-scroll flex-1'>
      {children}
    </main>
  );
}
