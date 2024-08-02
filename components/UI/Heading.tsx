export const Heading = ({ children, className }: React.ComponentProps<'h1'>) => {
  const classes = ['text-lg font-semibold', className];
  return <h1 className={classes.join(' ')}>{children}</h1>;
};
