import type { Metadata } from "next";
// Thông tin trang web mục đích là làm seo
import "./globals.css";
import { manrope } from "@/utils";
// import Sidebar from "@/components/layout/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/common/ThemeProvider";
export const metadata: Metadata = {
  title: "Academy",
  description: "Nền tảng học lập trình trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
