import Image from "next/image";

type LogoProps = {
  className?: string;
  height?: number;
};

// Source file is 786x281 (cropped from the uploaded logo).
const ASPECT_RATIO = 786 / 281;

/**
 * Bhumika Digital logo — uploaded artwork, served from /public/logo.png.
 */
export default function Logo({ className = "", height = 42 }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Bhumika Digital"
      width={Math.round(height * ASPECT_RATIO)}
      height={height}
      priority
      className={className}
    />
  );
}
