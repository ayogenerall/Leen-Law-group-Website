import Link from "next/link";
import Image from "next/image";
import { legalNav, mainNav } from "@/lib/site";
import { businessProfile, verified } from "@/content/business-profile";
import type { NavServiceLink } from "./Nav";

export function Footer({ serviceLinks }: { serviceLinks: NavServiceLink[] }) {
  const email = verified(businessProfile.email);
  const phone = verified(businessProfile.phone);
  const address = verified(businessProfile.address);
  const hours = verified(businessProfile.hours);
  const hasContact = email || phone || address || hours;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-champagne/25 bg-obsidian" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="bg-plume pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="sm:col-span-2 lg:col-span-4">
          <Image
            src="/brand/leen-logo-gold.webp"
            alt="Leen Law Group logo"
            width={900}
            height={994}
            className="h-auto w-36"
          />
          <p className="mt-8 max-w-xs text-[0.9375rem] leading-relaxed text-mist">
            Consumer-support and business-administration services. Practical support, clear direction, and organized next steps.
          </p>
        </div>

        <nav aria-label="Footer: explore" className="lg:col-span-2">
          <p className="t-eyebrow mb-5">Explore</p>
          <ul className="space-y-1">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 text-[0.9375rem] text-ivory/85 transition-colors hover:text-turquoise">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer: services" className="lg:col-span-3">
          <p className="t-eyebrow mb-5">Services</p>
          <ul className="space-y-1">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 text-[0.9375rem] text-ivory/85 transition-colors hover:text-turquoise">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-10 lg:col-span-3 lg:block">
          <div>
          <p className="t-eyebrow mb-5">Contact</p>
          {hasContact ? (
            <ul className="space-y-3 text-[0.9375rem] text-ivory/85">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-turquoise">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-turquoise">
                    {phone}
                  </a>
                </li>
              )}
              {address && <li>{address}</li>}
              {hours && <li>{hours}</li>}
            </ul>
          ) : (
            <p className="text-[0.9375rem] text-ivory/85">
              Use our{" "}
              <Link href="/contact" className="text-turquoise underline underline-offset-4">
                request form
              </Link>{" "}
              to get in touch.
            </p>
          )}
          </div>
          <nav aria-label="Footer: policies" className="mt-10 sm:mt-0 lg:mt-10">
            <p className="t-eyebrow mb-5">Policies</p>
            <ul className="space-y-0.5">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 text-sm text-mist transition-colors hover:text-turquoise">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="relative border-t border-graphite">
        <div className="container-x flex flex-col gap-3 py-7 text-[0.8125rem] text-mist md:flex-row md:items-center md:justify-between">
          <p>© {year} Leen Law Group. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">
            Leen Law Group is not a law firm and does not provide legal advice or representation.{" "}
            <Link href="/legal/disclaimer" className="text-ivory/85 underline underline-offset-4 hover:text-turquoise">
              Read the disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
