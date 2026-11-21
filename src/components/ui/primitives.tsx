import Link from "next/link";
import { Icon } from "./Icon";

type BtnVariant = "primary" | "secondary" | "light";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2.5 whitespace-nowrap rounded-[2px] px-6 py-3 text-[0.9375rem] font-semibold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-premium)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<BtnVariant, string> = {
  primary: "bg-turquoise text-obsidian hover:bg-turquoise-soft shadow-[0_0_0_0_rgba(32,184,176,0)] hover:shadow-[0_8px_30px_-8px_rgba(32,184,176,0.55)]",
  secondary: "border border-champagne/70 text-ivory hover:border-champagne hover:bg-champagne/10",
  light: "border border-ink/25 text-ink hover:border-deep-teal hover:text-deep-teal",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: BtnVariant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      {arrow && <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </Link>
  );
}

export function buttonClass(variant: BtnVariant = "primary") {
  return `${base} ${variants[variant]}`;
}

export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.9375rem] font-semibold ${light ? "text-deep-teal" : "text-turquoise"}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center [&_.t-eyebrow]:justify-center" : "max-w-3xl"}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Tag id={id} className={Tag === "h1" ? "t-h1" : "t-h2"}>
        {title}
      </Tag>
      {intro && <div className="t-lead mt-6 opacity-85">{intro}</div>}
    </div>
  );
}

/** Thin gold divider with a small plume-eye glyph echoing the logo motif. */
export function PlumeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="hairline-gold flex-1" />
      <svg viewBox="0 0 24 32" className="h-5 w-4 text-champagne" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 1.5C6 9 3.5 14.5 3.5 19.5a8.5 8.5 0 0 0 17 0C20.5 14.5 18 9 12 1.5Z" />
        <ellipse cx="12" cy="20" rx="3.2" ry="4.2" />
      </svg>
      <span className="hairline-gold flex-1" />
    </div>
  );
}

export function PreviewBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-amber-400/60 bg-amber-400/10 px-2 py-0.5 text-xs font-bold uppercase tracking-[0.12em] text-amber-300">
      <Icon name="alert" className="h-3 w-3" /> Preview · {status}
    </span>
  );
}
