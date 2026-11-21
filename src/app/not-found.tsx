import { ButtonLink, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-obsidian pt-24">
      <div className="bg-plume pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <Eyebrow className="mb-6">Page not found</Eyebrow>
        <h1 className="t-display max-w-3xl">This page isn't <em className="text-logo-gold">available.</em></h1>
        <p className="t-lead mt-6 max-w-xl text-mist">The page may have moved, or the content isn't published yet.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary" arrow={false}>Request Support</ButtonLink>
        </div>
      </div>
    </section>
  );
}
