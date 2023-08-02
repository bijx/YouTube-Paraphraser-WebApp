const VIDEO_ID_LENGTH = 11;
const YOUTUBE_URL_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

const urlField = document.querySelector('.url-field');
const actionsElement = document.getElementById('actions');
const logoElement = document.getElementById('logo');
const loadElement = document.getElementById('load');
const containerElement = document.getElementById('container');
const summaryElement = document.getElementById('summary');
const thumbnailElement = document.getElementById('thumbnail');
const thumbUrlElement = document.getElementById('thumb-url');
const titleElement = document.getElementById('title');
const authorElement = document.getElementById('author');
const authorUrlElement = document.getElementById('author-url');
const paraphrasedTextElement = document.getElementById('paraphrased-text');

async function paraphrase(videoId) {
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
      const res = await fetch(
        `https://yt-paraphraser-v1-cgkyf4xf6a-uc.a.run.app/youtube/${videoId}/{}`
      );
      const json = await res.json();

      if (json.result.error) {
        alert(`${json.result.error.error}: ${json.result.error.message}`);
        location.reload();
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
      alert('An error occurred: ' + error);
      window.location.href = window.location.origin;
    }
  } else {
    alert('Please enter a valid YouTube URL.');
    urlField.value = '';
  }
}

function showView(state) {
  if (state === 'loading') {
    actionsElement.style.display = 'none';
    loadElement.hidden = false;
    logoElement.style.display = 'none';
  } else if (state === 'summary') {
    loadElement.style.display = 'none';
    summaryElement.style.display = 'flex';
    containerElement.style.width = '50vw';
    containerElement.style.height = '70vh';
  }
}

document.getElementById('go').addEventListener('click', () => paraphrase());
document.getElementById('retry').addEventListener('click', () => {
  window.location.href = window.location.origin;
});

// Extract "v" parameter from URL query string
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('v');

// If video ID exists in URL parameter, paraphrase immediately
if (videoId) {
  console.log(videoId);
  paraphrase(videoId);
}
