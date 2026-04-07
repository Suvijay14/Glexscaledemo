import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-syne text-4xl font-bold text-white">Page not found</h1>
      <p className="mt-4 max-w-md text-text-secondary">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-purple-primary px-6 py-3 text-sm font-semibold text-white hover:bg-purple-light"
      >
        Back to Home
      </Link>
    </div>
  );
}
