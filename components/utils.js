import {
  actionsElement,
  logoElement,
  loadElement,
  containerElement,
  summaryElement,
} from './elements.js';
import { URL_HOME } from './constants.js';

/**
 * Reloads the YouTube Paraphraser WebApp page.
 */
export function reload() {
  window.location.href = window.location.origin + URL_HOME;
}

/**
 * Displays an alert message to the user.
 *
 * @param {string} message - Message to be displayed in the alert.
 * @param {function} [callback=null] - Callback function to execute after closing the alert.
 */
export function showAlert(message, callback = null) {
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

/**
 * Changes the view of the application based on a given state.
 *
 * @param {string} state - The view state ('loading' or 'summary').
 */
export function showView(state) {
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
