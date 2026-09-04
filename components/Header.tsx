import Link from "next/link";
import Logo from "./Logo";

/**
 * Minimal centered header: logo only, no navigation, no links, no menu.
 * Logo is not a link on the landing page itself (single-goal page), but on
 * the thank-you page it's fine to keep it static too — consistency over cleverness.
 */
export default function Header() {
  return (
    <header className="w-full py-6 sm:py-8">
      <div className="flex items-center justify-center">
        <Link href="/" aria-label="Bhumika Digital home">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
