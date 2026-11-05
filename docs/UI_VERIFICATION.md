# UI verification

This revision targets the portfolio served at **khuzaimahassan.me**. Hosting settings and the separate khuzaima-dev.vercel.app site are outside this change.

## Layout and navigation

- Compact portrait beside the name and availability at the top on phones/tablets, using a close crop of the shared blue-tie portrait. Desktop displays the same image at a larger size beside the introduction. Work and Resume remain visible near the top on portrait phones.
- Order: introduction, selected projects, experience, about/skills, education, credentials, contact.
- Project image overlays are removed; image framing emphasizes the map and dashboard metrics.
- Four featured projects initially; All and category filters keep all ten projects accessible.
- Compact navigation, a 46 × 46 px mobile menu button, visible focus indicators, and a skip link.
- All core sections are visible by default. No section visibility depends on an IntersectionObserver threshold or preloader.
- Earlier education and the detailed expertise overview use native expandable sections.
- Existing chat opens through the Contact section rather than a floating button that covers controls.

## Browser checks

Checked November 3, 2026 using the local branch preview, with the requested browser viewport sizes verified against the rendered dimensions.

| Viewport | Project columns | Navigation | Result |
| --- | --- | --- | --- |
| 320 × 568 | 1 | Mobile | No page/text overflow; primary action visible in opening screen |
| 360 × 640 | 1 | Mobile | No page/text overflow; primary action visible in opening screen |
| 390 × 844 | 1 | Mobile | No page/text overflow; primary action visible in opening screen |
| 768 × 1024 | 2 | Mobile | No page/text overflow |
| 844 × 390 | 2 | Mobile | No page/text overflow; short landscape screen uses vertical scrolling |
| 860 × 800 | 2 | Mobile | Menu breakpoint checked |
| 862 × 800 | 2 | Desktop | Menu breakpoint checked |
| 1024 × 768 | 2 | Desktop | No page/text overflow |
| 1440 × 900 | 2 | Desktop | No page/text overflow |
| 1920 × 1080 | 2 | Desktop | No page/text overflow |

Additional checks:

- Fresh small-phone navigation to Projects, including All ten cards: section remains visible.
- Featured / All / MLOps / Generative AI / Machine Learning / Data Engineering: 4 / 10 / 2 / 5 / 2 / 1 cards, with matching pressed states and count announcements.
- View All reveals ten cards and moves focus to the All filter.
- Menu opens, closes after navigation, closes on Escape with focus restored, and resets when crossing to desktop.
- Expertise and earlier-education disclosures expand and collapse.
- All four repository screenshot assets load; the existing resume PDF returns HTTP 200 with unchanged bytes.
- Existing project source/demo destinations, legacy section targets, and contact field names/types are preserved.
- Contact inputs have persistent labels. Invalid email is blocked by native form validation.
- Existing chat opens and closes from the new Contact launch button. No chat message was sent.
- A local test-only page with scripts omitted keeps every section and all ten projects visible, retains navigation and direct email, and hides the JavaScript-only form.
- Browser console had no errors or warnings during the checked flow.

These are browser viewport checks, not physical-device or multi-browser certification. The contact provider's real delivery was not tested; automated tests use a mail stub.

## Portrait and image framing follow-up

Both layouts use `pic/portrait-blue-tie.png`, generated from the original blue-tie portrait. Widths through 860 px show a 96–108 px close-cropped headshot beside the name/availability above the headline. Wider layouts show the same photograph as a larger 4:5 portrait beside the hero text. The original source portraits remain unchanged. The prompt and asset provenance are recorded in [pic/PORTRAIT.md](../pic/PORTRAIT.md). Project screenshots have no overlaid source labels; their provenance remains in the asset documentation. The map is framed from its lower region and the mentor dashboard from its center.

Rechecked the hero at 320×568, 360×640, 390×844, 414×896, 640×800, 768×1024, 844×390, 860×800, 862×800, 1024×768, 1440×900 and 1920×1080. The shared generated asset loaded at every size. No horizontal overflow, out-of-bounds hero text, or portrait/name overlap was found, and portrait phone actions remained in the opening screen. All ten projects were additionally checked at eight sizes, including 1280×800; no out-of-bounds text or image labels were found.

## Automated checks

With Node.js installed, run from the repository root:

```bash
node --check script.js
node --test tests/ui.test.cjs
```

The eleven tests cover filter reachability, View All focus, menu closing paths, navigation highlighting, preserved EmailJS routing, successful and failed contact requests, missing SDK fallback, duplicate-submit prevention, and video activation/cleanup/fallback behavior. No package installation or real email is required.

The existing EmailJS service, template, public key, form field contract, contact address, CV path, and chat account are retained. Submission now has inline status and a disabled in-flight button; failures preserve the entered message and offer direct email.

Screenshot provenance is recorded in [pic/projects/README.md](../pic/projects/README.md).

## Quasar walkthrough follow-up — November 5, 2026

Checked the local review branch in the in-app Chromium browser at 320×568, 390×844, 768×1024, 844×390 and 1280×720. The dialog remained inside the viewport with no horizontal document overflow; the short landscape layout kept the header, player and footer visible. These are browser viewport checks, not physical-device testing.

- The video has no `src` before opening, uses `preload="none"`, and does not autoplay.
- Clicking Watch walkthrough opens the modal and focuses its close button. Native playback was exercised on desktop and a 390 px phone viewport; the player reports a 151.23-second duration.
- Escape and the close button stop playback, remove the media source, restore scrolling, and return focus to Watch walkthrough.
- Open in new tab reaches the standalone MP4 player; Read transcript reaches the complete spoken text. Native controls expose fullscreen playback.
- Featured / All filtering and the mobile navigation toggle/Escape remain functional after using the video.
- Automated tests additionally cover modified-click and unsupported-dialog fallbacks, backdrop bounds, media errors, and pausing inline playback when opening the separate player.
- The optional Node preview server now ignores cache query strings and serves MP4, transcript and PDF files with the correct content types. Its request handler was checked against the actual HTML, CSS, JavaScript, video, transcript and resume assets without opening another port.

The final MP4 also passed a full video/audio decode, contains all eight supplied narration files in order at normal speed, and has no clipped audio peaks. This walkthrough covers documents, source checking and architecture; it does not include a successful agent execution demo.
