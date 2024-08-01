import { HighlightingNavbarProvider } from '../Util/HighlightingNavbarProvider';

export function NavBar({ children }: ChildrenRequired) {
  return <HighlightingNavbarProvider>{children}</HighlightingNavbarProvider>;
}
