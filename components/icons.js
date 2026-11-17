// The Paper Digest page's icons, drawn with one line weight wherever they
// appear: the stroke does not scale with the drawing (vector-effect), so a
// 16px icon in the header and a 20px one on a paper both draw a 1.6px line.
// Decorative only: the control around each icon carries its name.
const LINE = { vectorEffect: "non-scaling-stroke" };

function Icon({ size, width = size, height = size, viewBox = "0 0 20 20", className, children }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

// Save, and the header's way into Saved papers. Filled when a paper is saved
// (the page's CSS sets the fill).
export const BookmarkIcon = ({ size = 20, className }) => (
  <Icon size={size} className={className}>
    <path d="M5 3h10v14l-5-3.5L5 17z" {...LINE} />
  </Icon>
);

export const CalendarIcon = ({ size = 16, className }) => (
  <Icon size={size} className={className}>
    <rect x="3" y="4" width="14" height="13" rx="2" {...LINE} />
    <path d="M3 8h14M7 2v4M13 2v4" {...LINE} />
  </Icon>
);

// Filters (Domain and Method): three lines, each shorter than the last.
export const FilterIcon = ({ size = 16, className }) => (
  <Icon size={size} className={className}>
    <path d="M3 6h14M6 10h8M8.5 14h3" {...LINE} />
  </Icon>
);

export const ChevronIcon = ({ className }) => (
  <Icon width={10} height={6} viewBox="0 0 10 6" className={className}>
    <path d="M1 1l4 4 4-4" {...LINE} />
  </Icon>
);

// Copy link, and the check it shows once the link is copied (Lucide's "link"
// and "check", on their 24-unit grid).
export const LinkIcon = ({ size = 20 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...LINE} />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...LINE} />
  </Icon>
);

export const CheckIcon = ({ size = 20 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" {...LINE} />
  </Icon>
);
