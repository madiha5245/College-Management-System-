import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus CMS | College Management System",
  description:
    "A clear, connected workspace for students, courses, faculty, and attendance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
