import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <header>
      <h1>Have a gify day!</h1>
      <p>Your year in gifs...</p>
    </header>
    <article>{props.children}</article>
    <footer>
      <p>
        Made with ♥ by{" "}
        <a
          href="https://sirlisko.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Luca Lischetti (@sirLisko)
        </a>
      </p>
      <p>
        Powered By{" "}
        <a href="https://giphy.com/" target="_blank" rel="noopener noreferrer">
          GIPHY
        </a>
      </p>
    </footer>
    <style jsx>{`
      header {
        font-family: "Luckiest Guy", cursive;
        text-align: center;
        margin: 3rem auto;
        h1 {
          font-size: 3rem;
        }
      }
      article {
        min-height: 50vh;
      }
      footer {
        text-align: center;
        margin-top: 2rem;
        a {
          color: currentColor;
          font-weight: bold;
        }
      }
    `}</style>
  </div>
);

export default Layout;
