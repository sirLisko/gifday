import React, { useState } from "react";
import { getDaysInMonth } from "date-fns";
import times from "lodash.times";

import theme from "styles/theme";
import GifTile from "components/GifTile";
import { DailyGifs } from "types";

interface Props {
  dailyGifs: DailyGifs;
  onSelectedDay: (dayIndex: string) => void;
}

export const YearView = ({ dailyGifs, onSelectedDay }: Props) => {
  const [thisYear] = useState(new Date().getFullYear());
  const dayOfTheMonth = times(12).map((month) =>
    getDaysInMonth(new Date(thisYear, month)),
  );

  return (
    <table>
      <tbody>
        {dayOfTheMonth.map((days, monthIndex) => (
          <tr key={monthIndex}>
            {times(days).map((day) => {
              const index = `${day}-${monthIndex}`;
              return (
                <td key={index}>
                  <button onClick={() => onSelectedDay(index)} role="button">
                    {dailyGifs[index] ? (
                      <GifTile gifObj={dailyGifs[index]} />
                    ) : (
                      `${day + 1} / ${monthIndex + 1}`
                    )}
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
      <style jsx>{`
        table {
          margin: 0 auto;
          ${theme.mq.max.medium} {
            tbody {
              display: flex;
            }
          }
          td {
            margin: 0;
            padding: 0;
          }
        }
        tr {
          ${theme.mq.max.medium} {
            display: flex;
            flex-direction: column;
          }
        }
        button {
          border: 1px solid ${theme.colors.gray_light};
          color: ${theme.colors.gray_light};
          border-radius: 0.5rem;
          background: none;
          text-align: center;
          padding: 0;
          margin: 0;
          overflow: hidden;
          height: 8vw;
          width: 8vw;
          font-size: 0.25rem;
          ${theme.mq.small} {
            font-size: 0.5rem;
          }
          ${theme.mq.medium} {
            height: 3vw;
            width: 3vw;
          }
          div {
            width: 100%;
            object-fit: cover;
            height: 100%;
          }
          img,
          video {
            width: 100%;
            height: 100%;
          }
          .dynamic img {
            display: block;
          }
          img {
            display: none;
          }
          .dynamic video {
            display: none;
          }
          video {
            display: block;
          }
          &:hover img {
            display: none;
          }
          &:hover video {
            display: block;
          }
          &:hover {
            color: #000;
            border-color: #000;
          }
        }
      `}</style>
    </table>
  );
};

export default YearView;
