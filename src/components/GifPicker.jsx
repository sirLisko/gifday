import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled/macro";

import theme from "styles/theme";
import Modal from "components/Modal";
import GifTile from "components/GifTile";

import { getRandomGif } from "utils/gifAPI";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid ${theme.colors.accent};
  font-size: 2rem;
  outline-color: ${theme.colors.accent};
  padding: 0.25rem 1rem;
  margin: 1rem auto;
  width: calc(100% - 3.5rem);
`;

const StyledSearch = styled.button`
  background: ${theme.colors.accent};
  font-size: 1.5rem;
  border: navajowhite;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  height: 3rem;
  width: 3rem;
  margin-left: 0.5rem;
  text-align: center;
  padding: 0;
`;

const StyledOk = styled.button`
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
`;

const GifPicker = ({ selectedDay, selectedImg, onGifSelected }) => {
  const [image, setImage] = useState(selectedImg);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const getGif = (text) => {
    setLoading(true);
    getRandomGif(text)
      .then((gif) => {
        if (!gif) {
          return setError("we didn't find your gif");
        }
        setError();
        setImage({ text, gif });
        setLoading(false);
      })
      .catch(() => {
        setError("Please try again later");
        setLoading(false);
      });
  };

  const textInput = useRef();
  useEffect(() => {
    textInput && textInput.current.focus();
  }, []);

  if (!selectedDay) {
    return null;
  }

  return (
    <Modal
      isModalOpen={Boolean(selectedDay)}
      onClose={() => onGifSelected(selectedImg)}
    >
      <StyledContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return getGif(textInput.current.value);
          }}
        >
          <StyledInput
            type="text"
            name="what"
            ref={textInput}
            defaultValue={image && image.text}
          />
          <StyledSearch type="submit">yo!</StyledSearch>
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
                <GifTile gifObj={image.gif} />
                <StyledOk onClick={() => onGifSelected(image)}>
                  You Got It!
                </StyledOk>
              </Fragment>
            )}
          </Fragment>
        )}
      </StyledContainer>
    </Modal>
  );
};

GifPicker.propTypes = {
  selectedDay: PropTypes.string.isRequired,
  selectedImg: PropTypes.shape({
    text: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  onGifSelected: PropTypes.func.isRequired,
};

export default GifPicker;
