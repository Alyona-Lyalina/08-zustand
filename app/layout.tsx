import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400","700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub is a simple and efficient app for managing personal notes.It helps you create, edit, and organize notes easily, keeping all your ideas in one place.",
  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub is a simple and efficient app for managing personal notes.It helps you create, edit, and organize notes easily, keeping all your ideas in one place.",
    url: "https://08-zustand-black-xi.vercel.app/",
    images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
