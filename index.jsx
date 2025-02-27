import React from 'react';
import ReactDOM from 'react-dom/client';

// https://web.dev/articles/media-session
// https://blog.google/products/chrome/manage-audio-and-video-in-chrome/

const tracks = [
  {
    title: 'All the best cowboys',
    artist: 'Pete Townshend',
    album: 'more Pete',
    file: new Audio('song1.mp3'),
    artwork: [
      {
        src: 'https://picsum.photos/id/10/128/128',
        sizes: '128x128',
        type: 'image/png',
      },
    ],
  },
  {
    title: 'party in the usa',
    artist: 'little girl',
    album: 'black nights',
    file: new Audio('song2.mp3'),
    artwork: [
      {
        src: 'https://picsum.photos/id/13/128/128',
        sizes: '128x128',
        type: 'image/png',
      },
    ],
  },
  {
    title: 'Unforgettable',
    artist: 'Nat King Cole',
    album: 'The Ultimate Collection (Remastered)',
    file: new Audio('song3.mp3'),
    artwork: [
      {
        src: 'https://picsum.photos/id/14/128/128',
        sizes: '128x128',
        type: 'image/png',
      },
    ],
  },
];

tracks.forEach((t) => addHandlers(t));

function App() {
  const track = React.useRef(0);

  function onClick() {
    setHandlers(track);
    playSong(tracks[track.current]);

    navigator.mediaSession.playbackState = 'playing';
  }
  return (
    <section>
      <div>Hello React</div>
      <button onClick={onClick}>Start</button>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

function setHandlers(track) {
  navigator.mediaSession.setActionHandler('play', () => {
    tracks[track.current].file.play();
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    tracks[track.current].file.pause();
  });

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    pauseSong(tracks[track.current]);
    track.current = track.current > 0 ? track.current - 1 : tracks.length - 1;
    playSong(tracks[track.current]);
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    pauseSong(tracks[track.current]);
    track.current = track.current + 1 < tracks.length ? track.current + 1 : 0;
    playSong(tracks[track.current]);
  });
}

function playSong(track) {
  setMedia(track);
  track.file.play();
}

function pauseSong(track) {
  track.file.pause();
}

function setMedia(track) {
  navigator.mediaSession.metadata = new MediaMetadata(track);
}

function addHandlers(track) {
  track.file.loop = true;
  track.file.addEventListener('play', () => {
    navigator.mediaSession.playbackState = 'playing';
  });

  track.file.addEventListener('pause', () => {
    navigator.mediaSession.playbackState = 'paused';
  });
}
