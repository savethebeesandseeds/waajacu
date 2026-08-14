# Waajacu

Waajacu is a public-source research and engineering organization and the static
website for work published under the `WAAJACU TM` name.

The project presents open software, research, books, and educational tools
across learning, care, cooperation, culture, conservation, artificial
intelligence, applied cryptography, mathematical modeling, robotics, and
foundational engineering.

## Public Site

- Domain: [waajacu.com](https://waajacu.com)
- Main page: [`index.html`](index.html)
- Source identity and trademark guidance: [`TRADEMARKS.md`](TRADEMARKS.md)

## Repository Map

- [`index.html`](index.html): current public homepage.
- [`styles.css`](styles.css): shared site visual system.
- [`robots.txt`](robots.txt) and [`sitemap.xml`](sitemap.xml): crawler guidance and public route index.
- [`about/index.html`](about/index.html): organization and contributor profiles.
- [`about/cv/index.html`](about/cv/index.html): browser-viewable curriculum vitae.
- [`src/documents/curriculum_Santiago_Restrepo_cz.pdf`](src/documents/curriculum_Santiago_Restrepo_cz.pdf): source CV document.
- [`src/waajacu-logo-transparent.png`](src/waajacu-logo-transparent.png): transparent homepage logo.
- [`src/waacamaya_w1.jpg`](src/waacamaya_w1.jpg): earlier macaw illustration retained as a source asset.
- [`favicon.ico`](favicon.ico): browser favicon generated from the homepage illustration.
- [`rendering-dynamics`](rendering-dynamics): archived, licensed fluid-rendering experiment; it is not loaded by the homepage.

## Local Preview

The site is static. You can open [`index.html`](index.html) directly, or serve
the repository locally:

```sh
python -m http.server 1234
```

Docker alternative:

```sh
docker run --rm -it -p 1234:1234 -v "$PWD":/waajacu -w /waajacu python:3 python -m http.server 1234
```

Then visit `http://localhost:1234`.

## Source Identity

Official Waajacu source identity is tied to `waajacu.com` and the GitHub account
`savethebeesandseeds`. Trademark use is documented in
[`TRADEMARKS.md`](TRADEMARKS.md).
