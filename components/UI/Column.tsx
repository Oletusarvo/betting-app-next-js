type ColumnProps = ChildrenRequired & {
  gap: number;
};

export function Column({ children, gap }: ColumnProps) {
  return <div className={`flex flex-col gap-${gap}`}>{children}</div>;
}
