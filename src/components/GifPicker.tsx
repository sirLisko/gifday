import React, { Fragment, useState, useEffect, useRef } from "react";

import theme from "styles/theme";
import Modal from "components/Modal";
import GifTile from "components/GifTile";

import { getRandomGif } from "lib/gifAPI";
import { Image } from "types";

interface Props {
  selectedDay?: string;
  selectedImg?: Image;
  onClosePicker: (image?: Image) => void;
}

const GifPicker = ({ selectedDay, selectedImg, onClosePicker }: Props) => {
  const [image, setImage] = useState(selectedImg);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const getGif = (text: string) => {
    setLoading(true);
    fetch(`/api/search/${text}`)
      .then((response) => response.json())
      .then((gif) => {
        if (!gif) {
          return setError("we didn't find your gif");
        }
        setError(undefined);
        setImage({ text, gif });
        setLoading(false);
      })
      .catch(() => {
        setError("Please try again later");
        setLoading(false);
      });
  };

  const textInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    textInput && textInput.current?.focus();
  }, []);

  if (!selectedDay) {
    return null;
  }

  return (
    <Modal
      isModalOpen={Boolean(selectedDay)}
      onClose={() => onClosePicker(selectedImg)}
    >
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return textInput.current?.value && getGif(textInput.current.value);
          }}
        >
          <input
            type="text"
            name="what"
            ref={textInput}
            defaultValue={image && image.text}
          />
          <button type="submit">yo!</button>
        </form>
        {error && (
          <div style={{ textAlign: "center" }}>
            Ooops! Something went wrong :( <p>{error}</p>
          </div>
        )}
        {loading && <span>loading...</span>}
        {image && (
          <Fragment>
            {!loading && (
              <Fragment>
                <GifTile gifObj={image} />
                <button onClick={() => onClosePicker(image)}>
                  You Got It!
                </button>
              </Fragment>
            )}
          </Fragment>
        )}
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          input {
            border: 0;
            border-bottom: 1px solid ${theme.colors.accent};
            font-size: 2rem;
            outline-color: ${theme.colors.accent};
            padding: 0.25rem 1rem;
            margin: 1rem auto;
            width: calc(100% - 3.5rem);
          }
          button[type="submit"] {
            border: 0;
            border-bottom: 1px solid ${theme.colors.accent};
            font-size: 2rem;
            outline-color: ${theme.colors.accent};
            padding: 0.25rem 1rem;
            margin: 1rem auto;
            width: calc(100% - 3.5rem);
          }
          button:not([type="submit"]) {
            background: ${theme.colors.accent};
            background: linear-gradient(
              to right,
              ${theme.colors.accent} 0%,
              ${theme.colors.alternate} 80%,
              ${theme.colors.alternate} 100%
            );
            color: #fff;
            padding: 1rem 3rem;
            text-transform: uppercase;
            font-size: 1rem;
            font-weight: bold;
            border: none;
            border-radius: 5rem;
            margin: 1rem auto;
            display: block;
            letter-spacing: 3px;
            &:hover {
              transform: scale(1.04);
            }
          }
        `}</style>
      </div>
    </Modal>
  );
};

export default GifPicker;
