export default function HomeLayout({ children }: TODO) {
  return (
    <div className='flex-1 bg-gradient-to-b from-black via-black to-blue-950 h-full flex items-center text-white'>
      {children}
    </div>
  );
}
