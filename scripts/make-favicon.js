/**
 * Builds the favicon from the red "g" of the gloskin wordmark in
 * src/assets/Logo.png. The source logo is never written to — this only reads it.
 *
 * The full lockup is unreadable at 32px, so the icon is the one letterform that
 * survives scaling, on white. Measured off the pixels of the 1080px artwork:
 *   "g" glyph   x 596-650, y 470-575
 *
 * White rather than transparent: iOS composites a transparent touch icon onto
 * black, which would have made the one shared file look wrong on one platform.
 */
import sharp from 'sharp'

const SRC = 'src/assets/Logo.png'
const GLYPH = { left: 594, top: 470, width: 58, height: 105 }
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

async function main() {
  const pad = Math.round(GLYPH.height * 0.22)
  const side = GLYPH.height + pad * 2
  const mark = await sharp(SRC).extract(GLYPH).png().toBuffer()

  /* Composite first, resize second � sharp resizes before it composites, which
     would leave the glyph at its original size in a scaled-up tile. */
  const tile = await sharp({ create: { width: side, height: side, channels: 4, background: WHITE } })
    .composite([
      {
        input: mark,
        left: Math.round((side - GLYPH.width) / 2),
        top: Math.round((side - GLYPH.height) / 2),
      },
    ])
    .png()
    .toBuffer()

  await sharp(tile).resize(512, 512).png({ compressionLevel: 9 }).toFile('public/favicon.png')

  console.log(`tile ${side}px · wrote public/favicon.png`)
}

main()
