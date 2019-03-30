import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';

import GifPicker from 'components/GifPicker';
import YearView from 'components/YearView';

const StyledHeader = styled.header`
  font-family: 'Luckiest Guy', cursive;
  text-align: center;
  margin: 3rem auto;
  h1 {
    font-size: 3rem;
  }
`;

const StyledContainer = styled.div`
  min-height: 50vh;
`;

const StyledFooter = styled.footer`
  text-align: center;
  margin-top: 2rem;
  a {
    color: currentColor;
    font-weight: bold;
  }
`;

const App = () => {
  const [dailyGifs, setDailyGifs] = useState({});
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    const local = localStorage.getItem('dailyGifs');
    if (local) {
      try {
        const parsedLocal = JSON.parse(local);
        setDailyGifs(parsedLocal);
      } catch {
        localStorage.removeItem('dailyGifs');
      }
    }
  }, []);

  const saveGif = image => {
    const newdailyGifs = { ...dailyGifs, [selectedDay]: image };
    setDailyGifs(newdailyGifs);
    setSelectedDay();
    localStorage.setItem('dailyGifs', JSON.stringify(newdailyGifs));
  };

  return (
    <div>
      <StyledHeader>
        <h1>Have a gify day!</h1>
        <p>Your year in gifs...</p>
      </StyledHeader>
      {selectedDay && (
        <GifPicker
          selectedDay={selectedDay}
          selectedImg={dailyGifs[selectedDay]}
          onGifSelected={image => saveGif(image)}
        />
      )}

      <StyledContainer>
        <YearView dailyGifs={dailyGifs} onSelectedDay={setSelectedDay} />
      </StyledContainer>
      <StyledFooter>
        <p>
          Made with ♥ by{' '}
          <a
            href="https://sirlisko.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Luca Lischetti (@sirLisko)
          </a>
        </p>
        <p>
          Powered By{' '}
          <a
            href="https://giphy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GIPHY
          </a>
        </p>
      </StyledFooter>
    </div>
  );
};

export default App;
