import Fathom from "lib/fathom";
import { Header, Footer } from "components/navigation";
import 'styles/main.scss';

export const metadata = {
  title: 'Jory Tindall',
  description: 'Designer, saxophone artist, and educator.',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
            <Fathom />
            <Header />
            {children}
            <Footer />
        </body>
      </html>
    )
  }