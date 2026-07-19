import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/root/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
