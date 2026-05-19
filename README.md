# Waajacu

Waajacu is a public source marker and static website for work published under
the `WAAJACU TM` name.

The project presents open engineering work across safe software, custom
hardware, artificial intelligence, applied cryptography, protocol design, and
standards-oriented systems practice.

## Public Site

- Domain: [waajacu.com](https://waajacu.com)
- Main page: [`index.html`](index.html)
- Source identity and trademark guidance: [`TRADEMARKS.md`](TRADEMARKS.md)

## Repository Map

- [`index.html`](index.html): current public homepage.
- [`src/waacamaya_w1.jpg`](src/waacamaya_w1.jpg): homepage illustration.
- [`renderer.html`](renderer.html): experimental canvas and LaTeX rendering page.
- [`com/index.html`](com/index.html): earlier work-in-progress index material.

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
