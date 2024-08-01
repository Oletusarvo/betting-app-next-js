import { Spinner } from './Spinner';

export function WithSpinner({ children }: React.PropsWithChildren) {
  return (
    <>
      <Spinner />
      {children}
    </>
  );
}
