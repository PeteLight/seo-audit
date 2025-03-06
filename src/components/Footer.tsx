'use client';

export default function Footer() {
  return (
    <footer className="bg-white py-4 text-center shadow-inner">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} SEO Audit Pro. All rights reserved.
      </p>
    </footer>
  );
}
