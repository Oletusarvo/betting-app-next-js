import { ReactNode } from 'react';

export const DataToken = ({ label, content }: { label: string; content: ReactNode }) => {
  return (
    <div className='flex flex-col'>
      <h2 className='text-sm font-semibold'>{label}</h2>
      {content}
    </div>
  );
};

export const BigTextContent = ({ children }: React.PropsWithChildren) => (
  <div className='text-lg'>{children}</div>
);
