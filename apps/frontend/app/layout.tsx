import "@/styles/globals.scss";
import { Providers } from "./providers";

export const metadata = {
  title: "Mote",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
