export function Header({ children }: React.PropsWithChildren) {
  return (
    <header className='flex xs:flex-row lg:flex-col items-center justify-between px-4 py-4 text-slate-100'>
      {children}
    </header>
  );
}
