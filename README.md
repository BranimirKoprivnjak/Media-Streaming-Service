RTMP server that inputs video and audio stream and outputs M3U8 playlist.
Codifies video files in H.264 format and audio in AAC
Playlist can be delivered through HTTP.
Supports adaptive streaming in 4 different resolutions.

Publishing live streams
From OBS
Settings -> Stream
Service: Custom...
Server: rtmp://localhost:1935/live
Stream key: Your stream key

Media stream can be played in browser using the any player that supports Media source extensions

To do

- delete post published stream files
- cap frames to 30 on 360p resolution
- fine-tune -crf
