import './components/events.js';
import { paraphrase } from './components/paraphraser.js';

// Extract "v" parameter from URL query string
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('v');

// If video ID exists in URL parameter, paraphrase immediately
if (videoId) {
  console.log(videoId);
  paraphrase(videoId);
}
