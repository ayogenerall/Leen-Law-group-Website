import type { IconName } from "@/content/types";

const paths: Record<IconName | "arrow" | "plus" | "menu" | "close" | "search" | "external" | "alert", React.ReactNode> = {
  folder: <path d="M3 7.5V18a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 18V9a1.5 1.5 0 0 0-1.5-1.5h-7.2L10.5 5H4.5A1.5 1.5 0 0 0 3 6.5v1Zm0 3h18" />,
  signature: <><path d="M4 17c2.5-4 4-9 6-9s-1 8 1.5 8S15 11 16.5 11s.5 4 3.5 4" /><path d="M4 20.5h16" /></>,
  stamp: <><path d="M9 3.5h6v4.5a3 3 0 0 0 2 2.8V13H7v-2.2A3 3 0 0 0 9 8V3.5Z" /><path d="M5 13h14v3.5H5zM6.5 20.5h11" /></>,
  report: <><path d="M6 3.5h9l4 4v13H6z" /><path d="M15 3.5v4h4M9 12.5h7M9 15.5h7M9 9.5h3" /></>,
  briefcase: <><rect x="3.5" y="7" width="17" height="12.5" rx="1.5" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" /></>,
  network: <><circle cx="12" cy="5.5" r="2.2" /><circle cx="5.5" cy="18" r="2.2" /><circle cx="18.5" cy="18" r="2.2" /><path d="M12 7.7v4.3m0 0-5 4.2m5-4.2 5 4.2" /></>,
  referral: <><path d="M4 12h11m-4-4 4 4-4 4" /><path d="M15 5.5h3.5A1.5 1.5 0 0 1 20 7v10a1.5 1.5 0 0 1-1.5 1.5H15" /></>,
  book: <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15.5H5.5A1.5 1.5 0 0 0 4 21V5.5ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15.5h5.5A1.5 1.5 0 0 1 20 21V5.5Z" /></>,
  shield: <><path d="M12 3.5 5 6v5.5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6l-7-2.5Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  document: <><path d="M7 3.5h7l4 4V20.5H7z" /><path d="M14 3.5v4h4M10 12h5M10 15.5h5" /></>,
  person: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.7 3.6-5.5 7-5.5s6.2 1.8 7 5.5" /></>,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  external: <><path d="M14 4.5h5.5V10M19.5 4.5 11 13" /><path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></>,
  alert: <><path d="M12 4 2.8 19.5h18.4L12 4Z" /><path d="M12 10v4.5M12 17v.5" /></>,
};

export type AnyIcon = keyof typeof paths;

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.5 }: { name: AnyIcon; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
