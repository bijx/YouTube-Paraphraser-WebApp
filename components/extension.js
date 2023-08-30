/**
 * Opens the browser-specific extension page.
 */
export function openExtensionPage() {
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
