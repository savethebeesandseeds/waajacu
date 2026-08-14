# Artwork generation notes

Generated with the built-in ImageGen workflow on 2026-08-14. Flat chroma-key
backgrounds were removed locally and the final PNG alpha channels were checked
before the files were referenced by the site.

## `hero-botanical-v2.png`

```text
Use case: stylized-concept
Asset type: transparent botanical illustration layer for a dark website hero
Input image: Image 1 is a STYLE AND BROAD COMPOSITION REFERENCE ONLY. It shows the intended old-naturalist/scientific atmosphere and how foliage can support a hero layout. Do not reproduce any text, UI, logo, bird, or page content from it.
Primary request: Create only a rich tropical botanical habitat that will be composited behind an existing official macaw logo. Include layered rainforest foliage—large banana and heliconia leaves, philodendron/monstera forms, elegant vines, smaller native leaves, a few restrained tropical flowers, and delicate seed or pollen motifs. The foliage should feel lush, generous, and substantially more expansive than a narrow decorative frame.
Style/medium: refined nineteenth-century naturalist engraving fused with subtle contemporary scientific-diagram linework; intricate hand-inked veins and botanical accuracy; elegant rather than theatrical.
Composition/framing: wide landscape hero layer. Build substantial foliage masses rising from the lower-left, lower edge, and far-right edge, with lighter trailing leaves reaching across the upper-right and a few quiet sprigs toward the upper-left. Let the vegetation occupy roughly 55–65% of the canvas while retaining a generous calm opening through the central-right region for the existing macaw, and a calmer upper-left/center-left region where live webpage copy sits. Plants may extend naturally beyond the outer canvas edges. Avoid a symmetrical wreath, hard rectangular frame, or single isolated bouquet.
Palette: pale warm ivory, muted sage, grey-green, deep desaturated forest green, with very sparse oxidized-gold/copper points and hairline orbital geometry. Designed to sit softly over a very dark forest-green hero.
Scientific accents: only a few extremely subtle thin orbital arcs, botanical measurement ticks, constellational points, and one or two faint grid fragments integrated behind leaves. No prominent circles or eye-like targets.
Scene/backdrop: perfectly flat solid #ff00ff chroma-key background for local background removal. The background must be one absolutely uniform color with no gradients, texture, lighting variation, haze, floor plane, reflections, or shadows.
Constraints: no bird, no parrot, no macaw, no animal, no eye motif, no logo, no wordmark, no letters, no numbers, no text, no watermark. Do not use #ff00ff anywhere in the artwork. No cast shadow, contact shadow, glow, or translucent colored fog. Keep botanical edges crisp and clean against the flat key color. Preserve ample usable negative space for both the existing macaw and webpage copy.
Avoid: photorealism, watercolor wash, dense opaque scenic background, dramatic neon color, surveillance imagery, symmetry, a small corner ornament, a closed floral border.
```

Targeted background correction:

```text
Use case: precise-object-edit
Asset type: transparent botanical illustration layer for a dark website hero
Input image: Image 1 is the edit target from the immediately preceding generation.
Primary request: Change ONLY the fake white-and-pale-gray checkerboard background into one perfectly flat, completely uniform solid #ff00ff chroma-key field for local background removal.
Invariants: Preserve every botanical leaf, flower, vine, line, gold scientific accent, placement, proportion, crop, color, and engraved texture exactly as in Image 1. Do not redesign, add, remove, simplify, recolor, or reposition any foliage or scientific marks.
Background requirements: the #ff00ff field must be a single exact RGB color all the way through every empty opening between leaves and to every canvas edge. No checkerboard, no transparency preview, no white or gray tiles, no gradient, texture, noise, haze, lighting, shadow, glow, reflection, floor plane, or variation.
Constraints: no bird, no parrot, no macaw, no animal, no eye motif, no logo, no wordmark, no letters, no numbers, no text, no watermark. Do not use #ff00ff inside the botanical artwork. Crisp clean edges against the key color. Change only the background.
```

## `icons/naturalehia-care.png`

```text
Use case: logo-brand
Asset type: small website project emblem, displayed at approximately 54 pixels
Primary request: Create a gentle emblem for Naturalehia that communicates active care for animals, plants, and nature as a whole—not vigilance. Show two open, softly cupped hands, subtly shaped like leaves, forming a welcoming cradle around a young two-leaf sprout. Add one very small peaceful bird silhouette nestled near the sprout, and a loose open circular embrace made from a few restrained botanical dots or fine arcs.
Input images: Image 1 (foundation.png) and Image 2 (medical.png) are STYLE REFERENCES ONLY for line weight, naturalist engraving character, palette, and level of detail. Do not copy their subjects or composition.
Scene/backdrop: perfectly flat solid #ff00ff chroma-key background for later background removal.
Style/medium: compact naturalist-engraving emblem with a vector-like silhouette; hand-inked botanical linework; warm, kind, quietly scientific.
Composition/framing: one centered, balanced compact mark; strong readable silhouette at 54px; generous padding; hands and sprout remain the unmistakable primary forms; minimal internal detail.
Color palette: deep forest-green ink, pale sage, warm ivory, with only tiny muted-gold accents. Do not use magenta anywhere in the subject.
Constraints: no text, no lettering, no watermark, no cast shadow, no contact shadow, no reflection. The background must be one perfectly uniform #ff00ff with no gradient, texture, glow, floor plane, vignette, or lighting variation. Keep crisp separated edges for chroma removal.
ABSOLUTELY AVOID: eye, pupil, iris, eyelid, gaze, surveillance, target, crosshair, reticle, camera, lens, shield, badge, radar, concentric target rings, vigilance symbolism, defensive symbolism, aggressive posture, enclosing prison-like circle. The mark must feel like shelter, nurture, welcome, and care.
```

## `forest-original-cut-alpha.png`

This is the forest crop supplied by the user, with only its pale paper field
removed locally. The illustration itself was not regenerated or redesigned.

## `beehive-study.png`

Initial generation:

```text
Use case: stylized-concept
Asset type: transparent decorative illustration for the Waajacu homepage work-introduction section
Primary request: Create a detailed naturalist study of one traditional woven skep beehive, accompanied by a partial open honeycomb study with clearly readable hexagonal cells and exactly three small gentle honeybees.
Scene/backdrop: perfectly flat, uniform solid #ff00ff chroma-key background for local background removal
Subject: a single upright handwoven straw skep with a small dark entrance; a modest fragment of honeycomb arranged beside and slightly behind it; exactly three small bees in calm, natural flight, arranged as supporting details rather than a swarm
Style/medium: refined late-19th-century botanical and natural-history engraving; delicate etched linework, restrained cross-hatching, editorial museum-plate quality; not photorealistic, not cartoonish
Composition/framing: cohesive standalone horizontal study, centered, balanced and compact, with generous clean padding on every side; all subject elements fully separated from the canvas edges; strong readable silhouette at website scale
Color palette: forest green, muted sage, warm ivory, straw beige, and tiny muted-gold accents only
Materials/textures: woven straw ridges, lightly engraved wax cells, delicate bee wings and anatomy expressed through linework
Lighting/mood: even illustrative tone, gentle, caring, curious, calm
Constraints: exactly one skep hive; exactly one partial honeycomb study; exactly three bees; no plants, flowers, landscape, frame, labels, annotations, letters, numbers, logo, watermark, shadow, floor plane, reflection, or additional decorative objects. The background must be one perfectly uniform #ff00ff field with no gradients, texture, lighting variation, vignette, glow, or noise. Keep crisp isolated edges and generous padding. Do not use magenta or pink anywhere in the subject.
Avoid: photorealism; 3D rendering; cute mascot style; aggressive or vigilant feeling; dense swarm; dripping honey; glossy surfaces; background scenery; white halo; cast shadow.
```

Final style refinement:

```text
Use case: style-transfer
Asset type: chroma-key source for a transparent Waajacu homepage illustration
Input images: Image 1 is the edit target
Primary request: Change only the rendering style and palette of the subject in Image 1 into a refined late-19th-century natural-history engraving.
Style/medium: delicate etched linework, cross-hatching, restrained hand-tinted museum-plate illustration; clearly illustrated rather than photorealistic
Color palette: deep forest-green ink and muted sage washes dominate; warm ivory is used for highlights; straw beige is restrained; muted gold appears only as tiny accents on a few honeycomb cells and bee markings
Constraints: Preserve exactly one woven skep hive, exactly one partial honeycomb fragment, and exactly three bees from Image 1. Preserve their positions, proportions, anatomy, relative scale, composition, generous padding, and crisp silhouette. Keep the entire background perfectly uniform solid #ff00ff edge to edge, including all negative spaces and openings. No background gradient, texture, lighting variation, vignette, glow, haze, shadow, floor plane, or reflection. No cast shadow or halo. Do not add or remove any object. No text, logo, watermark, frame, plant, flower, scenery, label, letter, or number. Do not use magenta or pink in the subject.
Avoid: photorealism, glossy honey, saturated orange, full-color realism, 3D rendering, mascot style, dense swarm, aggressive feeling, black or brown background.
```

## `contact-scientific-field.png`

```text
Use case: stylized-concept
Asset type: full-section website background illustration for the Waajacu contact section, placed behind live text on the left and an existing separate ginkgo flower illustration on the right
Input image: the user's attached pale-green ginkgo scientific plate is a STYLE AND MOOD REFERENCE ONLY. Do not reproduce the flower, webpage, or exact layout.
Primary request: Create one coherent old-scientific field spanning the entire landscape canvas, built from elegant technical studies: perspective mesh grids, vector-angle constructions with fine arrows, a delicate protein-ribbon fold with alpha helices and beta sheets, molecular or cellular network graphs, polygonal nets, lattice fragments, measurement ticks, and a few small node-and-edge structures.
Scene/backdrop: a quiet pale botanical mint and warm-ivory paper field matching #dfe9dd, with extremely subtle natural paper grain and no border.
Style/medium: refined nineteenth-century scientific engraving blended with precise contemporary mathematical and biological line drawing; fine graphite and ink lines; scholarly, organic, calm, exploratory, and beautiful rather than futuristic.
Composition/framing: wide 3:2 landscape background that reaches every canvas edge. Keep the left 38% noticeably quieter and lower contrast so dark live webpage text remains readable. Let the right 62% carry the richer scientific structure behind the separately overlaid flower: a sweeping perspective mesh across the lower-right, an elegant protein fold in the upper-right/center, angular vector diagrams, connected molecular nets, and sparse lattice studies. Integrate the studies into one balanced field rather than isolated stickers. Use graceful asymmetry and plenty of breathing room.
Color palette: desaturated forest green, grey-sage, pale graphite, muted teal, warm ivory, and very sparse oxidized-gold accents. All marks should remain light enough to sit behind foreground content.
Constraints: background illustration only. No flower, no ginkgo, no plant, no bird, no animal, no person, no logo, no wordmark, no letters, no numbers, no equations, no labels, no watermark, no border, no UI. No prominent concentric circles, eye-like motif, target, crosshair, shield, surveillance imagery, or radar. No dark opaque blocks. No neon, cyberpunk, blueprint aesthetic, or photorealism.
Avoid: excessive density on the left; decorative randomness; fake text; illegible pseudo-writing; dramatic shadows; isolated white background; central focal object. The result must feel like a quiet scientific atlas page designed to sit behind existing content.
```

## `bees-honey-study.png`

```text
Use case: precise-object-edit
Asset type: transparent decorative illustration for the Waajacu homepage work-introduction
Input images: Image 1 is the edit target
Primary request: Remove the woven skep beehive completely. Keep only the partial honeycomb with visible honey and exactly the three bees.
Change only: remove the skep and gently tighten the remaining honeycomb-and-bees composition so it reads as a balanced horizontal natural-history study at small website scale.
Invariants: preserve the existing late-19th-century engraved style, deep forest-green ink, muted sage, warm ivory, and tiny gold accents; preserve the honeycomb’s etched cells and the three bees’ anatomy and calm character. Exactly three bees and one honeycomb fragment. No skep, hive structure, basket, building, roof, container, plant, flower, landscape, additional object, text, logo, or watermark.
Scene/backdrop: perfectly flat uniform solid #ff00ff chroma-key field for local background removal; no gradient, texture, vignette, shadow, floor, reflection, or lighting variation.
Composition: honeycomb as the main anchor, bees arranged around it with generous padding; strong silhouette and enough scale to remain legible at roughly 200–340px wide.
Constraints: no magenta in subject, no cast/contact shadow, crisp separated edges.
```
