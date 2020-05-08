import Head from "next/head";

const Intro = () => (
  <section className="window">
    <header className="title-bar">
      <div className="title-bar-text">Desktop Photography</div>
      <div className="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </header>
    <div className="window-body">
      <blockquote>
        <p>Screenshots: Desktop Photography</p>
        <cite>
          Bhoka [
          <a
            href="https://twitter.com/boop"
            rel="noopener noreferrer"
            target="_blank"
          >
            @boop
          </a>
          ]
        </cite>
      </blockquote>
    </div>
  </section>
);

const AuthorLink = ({ author }) => (
  <a
    href={`https://twitter.com/${author}`}
    rel="noopener noreferrer"
    target="_blank"
  >
    <button aria-label="Help"></button>
    <style jsx>{`
      a {
        display: block;
      }
      button {
        cursor: pointer;
      }
    `}</style>
  </a>
);

const Screenshot = ({ title, author, url }) => (
  <section className="window">
    <header className="title-bar">
      <div className="title-bar-text">{`${title} — ${author}`}</div>
      <div className="title-bar-controls">
        <AuthorLink author={author} />
      </div>
    </header>
    <div className="window-body">
      <img className="window-image" loading="lazy" src={url} alt={title} />
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>desktop.photography</title>
      </Head>

      <main>
        <Intro />

        <Screenshot
          url="/Screen Shot 2020-05-04 at 10.34.27 AM.png"
          title="Screen Shot 2020-05-04 at 10.34.27 AM"
          author="@mirshko"
        />
      </main>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body {
          background-color: teal;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        .window {
          max-width: 420px;
          margin: 8px auto 0 auto;
          padding: 0 8px;
        }

        .window-image {
          max-width: 100%;
          vertical-align: middle;
          -webkit-user-drag: none;
        }

        .title-bar-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        blockquote {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
