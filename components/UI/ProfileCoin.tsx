type ProfileCoinProps = React.ComponentProps<'div'> & {
  content: string;
  contentSliceLength?: number;
};
export function ProfileCoin({
  content,
  className,
  contentSliceLength = 3,
  ...props
}: ProfileCoinProps) {
  const classes = [
    'w-[70px] flex items-center justify-center aspect-square rounded-full bg-blue-500 shadow-md font-semibold',
    className,
  ];
  return (
    <div
      className={classes.join(' ')}
      {...props}>
      {content.slice(0, contentSliceLength).toUpperCase()}
    </div>
  );
}
