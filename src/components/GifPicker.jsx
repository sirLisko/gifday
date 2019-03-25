import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import theme from 'styles/theme';
import Modal from 'components/Modal';
import GifTile from 'components/GifTile';

const { REACT_APP_GIF_API_GET_RANDOM } = process.env;

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
  if (!selectedDay) {
    return null;
  }

  const [image, setImage] = useState(selectedImg);
  const [error, setError] = useState();
  const getGif = text =>
    fetch(`${REACT_APP_GIF_API_GET_RANDOM}${text}`)
      .then(response => response.json())
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setError("We didin't find your Gif");
        } else {
          setError();
          setImage({ text, src: data.images.downsized_small.mp4 });
        }
      })
      .catch(() => setError('Please retry later.'));

  const textInput = useRef();
  useEffect(() => {
    textInput && textInput.current.focus();
  }, []);

  return (
    <Modal
      isModalOpen={Boolean(selectedDay)}
      onClose={() => onGifSelected(selectedImg)}
    >
      <StyledContainer>
        <form
          onSubmit={e => {
            e.preventDefault();
            return getGif(e.target.elements.what.value);
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
          <div style={{ textAlign: 'center' }}>
            Ooops! Something went wrong :( <p>{error}</p>
          </div>
        )}
        {image && (
          <Fragment>
            <GifTile gif={image.src} />
            <StyledOk onClick={() => onGifSelected(image)}>
              You Got It!
            </StyledOk>
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
