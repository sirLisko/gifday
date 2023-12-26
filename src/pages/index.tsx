import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Gif } from "@prisma/client";

import Layout from "components/Layout";
import prisma from "lib/prisma";
import YearView from "components/YearView";
import GifPicker from "components/GifPicker";
import { DailyGifs, Image } from "types";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    return { props: {} };
  }
  const gifs = await prisma.gif.findMany({
    where: { author: { email: session.user.email } },
  });
  return {
    props: { gifs },
  };
};

type Props = {
  gifs: Array<Gif>;
};

const Blog: React.FC<Props> = (props) => {
  const [dailyGifs, setDailyGifs] = useState<DailyGifs>({});
  const [selectedDay, setSelectedDay] = useState<string>();

  useEffect(() => {
    const local = localStorage.getItem("dailyGifs");
    if (local) {
      try {
        const parsedLocal = JSON.parse(local);
        setDailyGifs(parsedLocal);
      } catch {
        localStorage.removeItem("dailyGifs");
      }
    }
  }, []);

  const saveGif = (image: Image) => {
    if (selectedDay) {
      const newdailyGifs = { ...dailyGifs, [selectedDay]: image };
      setDailyGifs(newdailyGifs);
      setSelectedDay(undefined);
      localStorage.setItem("dailyGifs", JSON.stringify(newdailyGifs));
      fetch("/api/gif", {
        method: "POST",
        body: JSON.stringify({
          day: Number(selectedDay.split("-")[0]),
          month: Number(selectedDay.split("-")[1]),
          title: image.text,
          video: image.gif.gif,
          image: image.gif.still,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  return (
    <Layout>
      <div className="page">
        <main>
          {selectedDay && (
            <GifPicker
              selectedDay={selectedDay}
              selectedImg={dailyGifs[selectedDay]}
              onClosePicker={(image) =>
                image ? saveGif(image) : setSelectedDay(undefined)
              }
            />
          )}
          {props.gifs && (
            <YearView
              dailyGifs={props.gifs?.reduce(
                (acc, gif) => ({
                  ...acc,
                  [`${gif.day}-${gif.month}`]: {
                    text: gif.title,
                    gif: { gif: gif.video, still: gif.image },
                  },
                }),
                {},
              )}
              onSelectedDay={setSelectedDay}
            />
          )}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
