export function RoundedBox({
  children,
  className,
}: ChildrenRequired & React.ComponentProps<'div'>) {
  const classes = ['rounded-md shadow-lg overflow-hidden p-2 bg-blue-950', className];
  return <div className={classes.join(' ')}>{children}</div>;
}
