# Rendering Dynamics

This folder contains interactive rendering code used by the Waajacu public
interface.

## Fluid Cursor

`fluid-cursor.js` is adapted from Pavel Dobryakov's WebGL Fluid Simulation:

- Source: https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
- License: MIT
- Local license copy: `LICENSE-PavelDoGreat-WebGL-Fluid-Simulation.txt`

The integration removes the original demo controls and promo elements, keeps the
WebGL fluid solver, and runs it as a page-wide pointer-reactive canvas layer.

## Macaw Run

`macaw-runner.js` is a small canvas game for the public homepage. It keeps the
runner logic, drawing, scoring, and input handling separate from `index.html` so
future interaction work can build on it without crowding the page markup.
