import type { Metadata } from "next";
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";
import "./globals.css";
import FaviconChanger from "@/components/FaviconChanger";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" id="favicon-link" />
      </head>
      <body>
        <KumaRegistry>{children}</KumaRegistry>
        <FaviconChanger />
      </body>
    </html>
  );
}
