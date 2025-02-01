import { Header } from "@/components/header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-secondary">{children}</main>
    </>
  );
}
