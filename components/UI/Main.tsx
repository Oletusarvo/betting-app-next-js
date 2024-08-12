export function Main({ children }: React.PropsWithChildren) {
  return (
    <main className='w-full h-[100%] flex flex-col flex-1 xs:px-1 md:px-80 pb-20 gap-2 xs:justify-center md:justify-start'>
      {children}
    </main>
  );
}

export function MobileMain({ children }: React.PropsWithChildren) {
  return (
    <main className='flex flex-col gap-2 w-full h-full p-2 bg-white pb-20 oveflow-hidden overflow-y-scroll flex-1'>
      {children}
    </main>
  );
}
