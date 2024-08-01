import { Divider } from '@mui/material';
import { Heading } from './Heading';

type PageTitleProps = {
  text: string;
};

export const PageTitle = ({ text }: PageTitleProps) => {
  return (
    <div className='flex flex-col'>
      <Heading>{text}</Heading>
      <Divider />
    </div>
  );
};
