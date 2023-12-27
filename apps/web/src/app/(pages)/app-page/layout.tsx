import Fathom from "lib/fathom";
import { Header, Footer } from "components/navigation";
import 'styles/main.scss';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
            <Fathom />
            {children}
        </body>
      </html>
    )
  }