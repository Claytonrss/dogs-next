import type { Metadata } from "next";
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";
import FaviconChanger from "@/components/FaviconChanger";
import "./globals.css";
import { type_second } from "@/functions/fonts";

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
      <body className={type_second.variable}>
        <KumaRegistry>{children}</KumaRegistry>
        <FaviconChanger />
      </body>
    </html>
  );
}
