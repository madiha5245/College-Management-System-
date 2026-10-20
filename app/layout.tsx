import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = { title: "Northbridge College · Administration", description: "College course management administration dashboard preview" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }
