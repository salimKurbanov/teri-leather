import { Comfortaa, Inter } from "next/font/google";
import './styles/style.scss';
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import Aside from "./components/Aside";
import Message from "./components/Message";

const inter = Comfortaa({ subsets: ["latin"], display: "swap", });

export const metadata = {
  title: "Teri Leather | Официальный сайт | Интернет-магазин | Teri Leather",
  description: "",
};

export default function RootLayout({ children }) {

  return (
    <html lang="ru">
      <body className={inter.className}>
          <Aside />
          <Header/>
          <Message />
          {children}

          <Footer />
        
      </body>
    </html>
  );
}
