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

function reload() {
  window.location.href =
    window.location.origin + '/YouTube-Paraphraser-WebApp/';
}

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
      const res = await fetch(`http://localhost:8081/youtube/${videoId}/{}`);
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
  window.location.href =
    window.location.origin + '/YouTube-Paraphraser-WebApp/';
});

// Extract "v" parameter from URL query string
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('v');

// If video ID exists in URL parameter, paraphrase immediately
if (videoId) {
  console.log(videoId);
  paraphrase(videoId);
}

function showAlert(message, callback = null) {
  const alertBox = document.getElementById('custom-alert');
  const alertText = document.getElementById('custom-alert-text');
  const closeButton = document.getElementById('custom-alert-close');

  alertText.textContent = message;
  alertBox.style.display = 'flex';

  function closeAlert() {
    alertBox.style.display = 'none';
    closeButton.removeEventListener('click', closeAlert);
    alertBox.removeEventListener('click', outsideClick);

    if (callback) {
      callback();
    }
  }

  function outsideClick(e) {
    if (e.target === alertBox) {
      closeAlert();
    }
  }

  closeButton.addEventListener('click', closeAlert);
  alertBox.addEventListener('click', outsideClick);
}

// Promo Banner
function openExtensionPage() {
  var isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || safari.pushNotification);

  if (isChrome) {
    window.open(
      'https://chrome.google.com/webstore/detail/youtube-paraphraser/gkgbmkfnmceicpkehajbcichphjmcgga',
      '_blank'
    );
  } else if (isFirefox) {
    window.open(
      'https://addons.mozilla.org/en-US/firefox/addon/youtube-paraphraser/',
      '_blank'
    );
  }
  // else if (isSafari) {
  //   alert('Please visit the Safari Extensions page to get the extension.');
  // }
  else {
    window.open(
      'https://chrome.google.com/webstore/detail/youtube-paraphraser/gkgbmkfnmceicpkehajbcichphjmcgga',
      '_blank'
    ); // default to Chrome if not detected
  }
}
