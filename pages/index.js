import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useRef, useState } from "react";

function useClose() {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle];
}

const Intro = ({ dragConstraints }) => {
  const [isOpen, toggle] = useClose();

  return (
    <DraggableWindow
      className="intro"
      isOpen={isOpen}
      dragConstraints={dragConstraints}
    >
      <div className="window">
        <header className="title-bar">
          <div className="title-bar-text">Desktop Photography</div>
          <div className="title-bar-controls">
            <button onClick={toggle} aria-label="Close"></button>
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
      </div>
    </DraggableWindow>
  );
};
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

const DraggableWindow = ({
  active,
  children,
  className,
  dragConstraints,
  isOpen,
  onClick,
  onDragStart,
}) => {
  const cachedClassNames = classNames(
    "window-wrapper",
    active ? "is-active" : "",
    className
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          transition={{ duration: 0.05 }}
          className={cachedClassNames}
          drag
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          dragConstraints={dragConstraints}
          dragElastic={0}
          dragMomentum={false}
          onClick={onClick}
          onDragStart={onDragStart}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Screenshot = ({ title, author, url, dragConstraints }) => {
  const [isOpen, toggle] = useClose();

  return (
    <DraggableWindow isOpen={isOpen} dragConstraints={dragConstraints}>
      <div className="window">
        <header className="title-bar">
          <div className="title-bar-text">{`${title} — ${author}`}</div>
          <div className="title-bar-controls">
            <AuthorLink author={author} />
            <button onClick={toggle} aria-label="Close"></button>
          </div>
        </header>
        <div className="window-body">
          <img className="window-image" loading="lazy" src={url} alt={title} />
        </div>
      </div>
    </DraggableWindow>
  );
};

export default function Home() {
  const dragConstraints = useRef(null);

  return (
    <div className="root">
      <Head>
        <title>desktop.photography</title>
        <meta name="description" content="Screenshots: Desktop Photography" />
      </Head>

      <main className="content" ref={dragConstraints}>
        <Intro dragConstraints={dragConstraints} />

        <Screenshot
          url="/Screen Shot 2020-05-04 at 10.34.27 AM.png"
          title="Screen Shot 2020-05-04 at 10.34.27 AM"
          author="@mirshko"
          dragConstraints={dragConstraints}
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

        .root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-height: -webkit-fill-available;
        }

        .content {
          position: relative;
          flex: 1;
        }

        .intro {
          right: 0;
          z-index: 999999999;
          top: 0;
        }

        .window-wrapper {
          position: absolute;
          user-select: none;
          max-width: 420px;
          margin: 8px;
        }

        .window-wrapper.is-active {
          z-index: 999999998;
        }

        .title-bar {
          cursor: -webkit-grab;
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
