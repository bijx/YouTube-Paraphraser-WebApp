import {
  YOUTUBE_URL_REGEX,
  VIDEO_ID_LENGTH,
  API_ENDPOINT,
} from './constants.js';
import {
  urlField,
  thumbnailElement,
  thumbUrlElement,
  titleElement,
  authorElement,
  authorUrlElement,
  paraphrasedTextElement,
} from './elements.js';
import { reload, showView, showAlert } from './utils.js';

/**
 * Fetches and displays the paraphrased content of a YouTube video.
 *
 * @param {string} videoId - The YouTube video ID.
 */
export async function paraphrase(videoId) {
  if (!videoId) {
    const url = urlField.value;
    const match = url.match(YOUTUBE_URL_REGEX);
    if (match && match[5].length === VIDEO_ID_LENGTH) {
      videoId = match[5];
    }
  }

  if (videoId) {
    try {
      showView('loading');
      const res = await fetch(`${API_ENDPOINT}${videoId}/{}`);
      const json = await res.json();
      if (json.result.error) {
        showAlert(
          `${json.result.error.error}: ${json.result.error.message}`,
          reload
        );
      } else {
        const metadata = json.result.videoMetadata;
        showView('summary');

        thumbnailElement.src = metadata.thumbnail;
        thumbUrlElement.href = metadata.url;

        titleElement.innerHTML = metadata.title;
        authorElement.innerHTML = metadata.author;
        authorUrlElement.href = metadata.authorUrl;

        paraphrasedTextElement.value = json.result.summary.trim();
      }
    } catch (error) {
      showAlert('An error occurred: ' + error, reload);
    }
  } else {
    showAlert('Please enter a valid YouTube URL.', () => {
      urlField.value = '';
    });
  }
}
