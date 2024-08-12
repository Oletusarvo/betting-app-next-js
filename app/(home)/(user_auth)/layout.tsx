export default function UserAuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className='px-4 flex w-full h-full items-center'
      id='user-auth-layout'>
      {children}
    </div>
  );
}
