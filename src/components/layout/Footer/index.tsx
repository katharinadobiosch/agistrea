import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)]/90">
      <div className=" flex flex-col gap-[1.2rem] text-[1.2rem] text-[var(--color-muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Agistrea – small island stays.</p>
        <div className="flex flex-wrap items-center gap-[1.2rem]">
          <span>Made with ♥ for a tiny Greek island.</span>
          <Link
            href="/owners/register"
            className="underline-offset-2 hover:text-[var(--color-accent)] hover:underline"
          >
            List your place
          </Link>
        </div>
      </div>
    </footer>
  );
}
