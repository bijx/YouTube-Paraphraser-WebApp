# YouTube Paraphraser Web App

[**Try out the app!**](https://bijx.github.io/YouTube-Paraphraser-WebApp/)
**OR**
[**Get the Chrome Extension for faster summaries!**](https://chrome.google.com/webstore/detail/youtube-paraphraser/gkgbmkfnmceicpkehajbcichphjmcgga)

This project is a web-based client for the YouTube Paraphraser application. The simple interface is designed to take YouTube video URLs and leverage AI technology to generate paraphrased summaries of the video content. The application is developed using HTML, CSS, and JavaScript for simplicity.

## Features

- Parses YouTube URLs and extracts video identifiers.
- Communicates with the YouTube Paraphraser API to get paraphrased summaries.
- Handles regular and shortened YouTube URL formats.
- Basic error handling for invalid URLs and fetch errors.
- Direct URL Parameter usage, which allows users to append video IDs to the application's URL to skip manual input. (buggy)

## Getting Started

To get started with the YouTube Paraphraser Web App, you simply need to provide a YouTube URL. The app will then communicate with the backend AI to provide a paraphrased summary of the video's content. 

## Usage

1. Open the application in your web browser.
2. Paste a YouTube URL into the input field and click "Go".
3. If the URL is valid, the application will retrieve the paraphrased content for the corresponding video and display it on the page.

You can also use the app by appending a YouTube video ID to the URL query string. This will allow the app to fetch the paraphrased content immediately without needing to paste the URL into the input field.

Example:
`https://bijx.github.io/YouTube-Paraphraser-WebApp/?v=jNQXAC9IVRw`

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

For any queries or suggestions, feel free to reach out.

---

Project Link: [YouTube Paraphraser Web App](https://bijx.github.io/YouTube-Paraphraser-WebApp/)

---
