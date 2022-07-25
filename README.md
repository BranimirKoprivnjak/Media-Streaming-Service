## About

RTMP server that inputs video and audio stream and outputs M3U8 playlist.<br>
Codifies video files in H.264 format and audio in AAC<br>
Playlist can be delivered through HTTP.<br>
Supports adaptive streaming in 4 different resolutions.<br>

Built with modified node-media-server which accepts raw ffmpeg command: https://github.com/BranimirKoprivnjak/Node-Media-Server

### Publishing live streams

From OBS<br>
Settings -> Stream<br>
Service: Custom...<br>
Server: rtmp://localhost:1935/live<br>
Stream key: Your stream key<br>

Media stream can be played in browser using the any player that supports Media source extensions

### To do

- delay vod deletion on stream end so clients have time to fetch latest chunks
- cap frames to 30 on 360p resolution
- fine-tune -crf
- prevent file creation & transmuxing on invalid stream inputs

### Nice to do's

- setup https server
- add load balancing
