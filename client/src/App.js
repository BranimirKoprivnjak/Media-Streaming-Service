import { Route, Routes } from 'react-router-dom';

import LiveStreams from './components/LiveStreams.js';
import VideoPlayer from './components/VideoPlayer.js';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LiveStreams />} />
      <Route exact path="/:streamKey" element={<VideoPlayer />} />
    </Routes>
  );
};

export default App;
