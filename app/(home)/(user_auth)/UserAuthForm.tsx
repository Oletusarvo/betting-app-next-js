export function UserAuthForm({ children, ...props }: React.ComponentProps<'form'>) {
  return (
    <form
      {...props}
      className='flex flex-col gap-4 mt-8 animate-slide-in-from-left xs:w-full lg:w-auto'>
      {children}
    </form>
  );
}
