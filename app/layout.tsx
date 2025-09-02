import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  // title: "NoteHub",
  // description:
  //   "NoteHub is a simple and efficient app for managing personal notes.",
  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub is a simple and efficient app for managing personal notes.",

    images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
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
