export const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
    className={props.className}
  >
    <path d="M12 2l1.4 3.9 3.9 1.4-3.9 1.4L12 12l-1.4-3.9L6.7 7.3l3.9-1.4L12 2zM4 14l.9 2.4L7.3 17l-2.4.9L4 20l-.9-2.1L1 17l2.1-.6L4 14zm16 0l.9 2.4 2.4.6-2.4.9L20 20l-.9-2.1-2.4-.9 2.4-.6L20 14zM12 16l.9 2.4L15.3 19l-2.4.9L12 22l-.9-2.1L8.7 19l2.4-.6L12 16z" />
  </svg>
);
