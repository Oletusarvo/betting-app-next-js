import Link from 'next/link';
import { useEffect, useRef } from 'react';

type IconLinkProps = React.ComponentProps<typeof Link> & {
  selected?: boolean;
  icon: string;
};

export function IconLink({ selected = false, icon, ...props }: IconLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const highlightColor = 'text-blue-200';

    if (selected) {
      ref.current?.classList.add(highlightColor);
    } else {
      ref.current?.classList.remove(highlightColor);
    }
  }, [selected]);

  return (
    <Link
      {...props}
      ref={ref}>
      <i className={`fa ${icon}`} />
    </Link>
  );
}
