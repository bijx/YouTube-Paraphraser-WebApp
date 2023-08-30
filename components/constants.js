const isDevelopment = ['127.0.0.1', 'localhost'].includes(
  window.location.hostname
);

export const VIDEO_ID_LENGTH = 11;
export const YOUTUBE_URL_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
export const API_ENDPOINT = isDevelopment
  ? 'http://localhost:8081/youtube/'
  : 'https://yt-paraphraser-v1-2xko3wx73q-uc.a.run.app/youtube/';
export const URL_HOME = isDevelopment ? '' : '/YouTube-Paraphraser-WebApp/';
