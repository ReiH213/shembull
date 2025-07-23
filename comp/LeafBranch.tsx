export const LeafBranch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    {...props}
    className={props.className}
    stroke-width="2"
  >
    <path d="M8 56 C24 40 40 24 56 8" stroke-linecap="round" />
    <path d="M14 42 c6-6 12-6 18 0-6 6-12 6-18 0z" />
    <path d="M26 30 c6-6 12-6 18 0-6 6-12 6-18 0z" />
    <path d="M38 18 c6-6 12-6 18 0-6 6-12 6-18 0z" />
  </svg>
);
