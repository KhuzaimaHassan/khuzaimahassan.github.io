# Quasar walkthrough

`quasar-walkthrough.mp4` is a 151.23-second, 1920×1080 H.264/AAC video with embedded captions. It combines six presentation slides and actual Quasar document-upload, readiness, answer, and source-check captures with eight narration recordings supplied by Khuzaima. A quiet original ambient music bed sits beneath the narration. The matching spoken script is in `quasar-walkthrough-transcript.txt`.

The Atlas import brief is illustrative demonstration input. Its upload, retention, and retry values describe that sample document, rather than product limits. The video discusses agent approval behavior but does not demonstrate a successful agent run. Live attempts encountered a provider 503, so no successful agent execution is represented here.

The poster at `../pic/projects/quasar-walkthrough-cover.png` uses the presentation cover and actual document-answer capture. No external video service or tracking embed is required.

To replace the video, update the MP4, transcript, and poster together. Keep a web-compatible H.264/AAC encode with MP4 faststart, check captions and audio timing, then test the modal and direct link. If moving to an external host, update both video links and confirm that the selected URL is playable by the HTML video element; a watch-page URL is not a media URL.

The HTML video has no source until the walkthrough is activated. Closing the modal pauses playback, releases the source, restores page scrolling, and returns focus to its opener. Modified clicks and browsers without native dialog support retain ordinary link behavior.
