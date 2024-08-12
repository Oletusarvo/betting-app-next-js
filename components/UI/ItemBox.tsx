export function ItemBox({ children }: React.PropsWithChildren) {
  return (
    <div className='flex w-full flex-col rounded-lg overflow-hidden shadow-md bg-white text-slate-500 border-[2px] border-slate-200'>
      {children}
    </div>
  );
}

ItemBox.Header = function ({ children }: React.PropsWithChildren) {
  return (
    <div className='flex items-center justify-between px-2 py-4 border-b-[2px]'>{children}</div>
  );
};

ItemBox.Title = function ({ children }: React.PropsWithChildren) {
  return (
    <h2 className='text-gray-600 font-semibold overflow-hidden text-ellipsis text-nowrap w-[70%]'>
      {children}
    </h2>
  );
};

ItemBox.Body = function ({ children }: React.PropsWithChildren) {
  return <div className='p-2'>{children}</div>;
};
