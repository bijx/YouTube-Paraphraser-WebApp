import { paraphrase } from './paraphraser.js';
import { reload } from './utils.js';
import { openExtensionPage } from './extension.js';

document.getElementById('go').addEventListener('click', () => paraphrase());
document.getElementById('retry').addEventListener('click', reload);
document
  .getElementById('extensionButton')
  .addEventListener('click', openExtensionPage);
