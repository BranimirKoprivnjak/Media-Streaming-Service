import { useCallback, useEffect, useState } from 'react';

const streamsUrl = 'http://127.0.0.1:8000/api/streams';

const LiveStreams = () => {
  const [liveStreams, setLiveStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noLiveStreamsFound, setNoLiveStreamsFound] = useState(false);

  const fetchLiveStreamsHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(streamsUrl);

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();

      const foundNoLiveStreams = Object.keys(data).length === 0;
      if (foundNoLiveStreams) {
        setNoLiveStreamsFound(true);
      } else {
        const currentLiveStreams = [];
        for (const stream of Object.keys(data.live)) {
          currentLiveStreams.push(data.live[stream]);
        }
        setLiveStreams(currentLiveStreams);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLiveStreamsHandler();
  }, [fetchLiveStreamsHandler]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && noLiveStreamsFound && <p>No results found</p>}
    </>
  );
};

export default LiveStreams;
