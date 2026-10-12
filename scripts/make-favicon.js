/**
 * Builds the favicon from the hair-follicle mark inside the "gro" of the grohair wordmark in
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
const GLYPH = { left: 240, top: 392, width: 68, height: 142 }
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

async function main() {
  const pad = Math.round(GLYPH.height * 0.14)
  const side = GLYPH.height + pad * 2
  /* The crop clips the foot of the "A" in ADVANCED, top right of the follicle.
     It is whitened out rather than cropped away, since the ring beside it
     reaches the same column. */
  const { data, info } = await sharp(SRC)
    .extract(GLYPH)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  for (let y = 0; y < Math.min(28, info.height); y++) {
    for (let x = 48; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels
      data[i] = data[i + 1] = data[i + 2] = 255
    }
  }
  const mark = await sharp(data, { raw: info }).png().toBuffer()

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
