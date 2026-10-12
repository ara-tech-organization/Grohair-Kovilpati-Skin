import result1 from './assets/result-1-pigmentation-evened.jpg'
import result2 from './assets/result-2-acne-settled.jpg'
import result3 from './assets/result-3-acne-scars-smoothed.jpg'
import result4 from './assets/result-4-pitted-scars-smoothed.jpg'
import result5 from './assets/result-5-texture-refined.jpg'

export const CLINIC = {
  /* The name on the clinic's own Facebook page, which is also how the logo
     reads: Advanced GroHair + GloSkin, Kovilpatti. */
  name: 'AdGro Hair and GloSkin Kovilpatti',
  shortName: 'AdGro GloSkin',
  city: 'Kovilpatti',
  phoneDisplay: '080980 56789',
  phoneHref: 'tel:+918098056789',
  email: 'adgrokovilpatti@gmail.com',
  facebook: 'https://www.facebook.com/people/AdGro-Hair-and-GloSkin-Kovilpatti/61590591973757/',
  instagram: 'https://www.instagram.com/adgrogloclinic.kovilpatti/',
}

/* One clinic. Still an array so the footer and the form keep a single shape to
   render, and a second branch would be one more entry. The map embed is a
   query embed on the street address — it needs no API key. */
const ADDRESS_QUERY =
  '16, First Floor, No. 464, Nellai Bypass Road, Near Fire Station, V.O.C. Nagar, Kadershan Koil, Kovilpatti, Tamil Nadu 628502'

export const BRANCHES = [
  {
    id: 'kovilpatti',
    name: 'Kovilpatti',
    lines: [
      '16, First Floor, No. 464, Nellai Bypass Road',
      'Near Fire Station, V.O.C. Nagar, Kadershan Koil',
      'Kovilpatti, Tamil Nadu – 628502',
    ],
    maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`,
    embed: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`,
  },
]

/* Trust metrics — the only place branch count is stated as a number */
export const TRUST_STATS = [
  { icon: 'CalendarCheck', value: '15+', label: 'Years of Excellence' },
  { icon: 'ShieldCheck', value: '18+', label: 'FDA-Cleared Treatments' },
  { icon: 'Users', value: '10,000+', label: 'Patients Treated' },
  { icon: 'Star', value: '4.8', label: 'Google Rating' },
  { icon: 'MapPin', value: 'Kovilpatti', label: 'Nellai Bypass Road' },
]

/**
 * CALL-URGENCY POPUP — follows the lead form when it is dismissed.
 *
 * ⚠ EVERY VALUE BELOW IS A CLAIM ABOUT THE CLINIC. The figures are taken from
 * the reference design and are placeholders: `wasPrice`, `nowPrice` and
 * `slotsLeft` state a real offer and a real availability, and a struck-through
 * price the clinic never charged is misleading advertising, not styling.
 * Replace them with the clinic's actual numbers before this goes live.
 *
 * `windowMinutes` drives the countdown. It restarts on every page load, so it
 * measures how long this visitor has been looking at the offer — not a
 * deadline the clinic is keeping. If the offer does have a real end time, say
 * so instead; a timer that resets on refresh is the kind of thing visitors
 * notice and stop trusting the rest of the page over.
 */
export const URGENCY = {
  slotsLeft: 6,
  wasPrice: '₹699',
  nowPrice: 'Free',
  priceNote: 'Consultation today only',
  windowMinutes: 15,
  /* Restated compactly here — the popup has room for three, not five. */
  proof: ['Kovilpatti', '15+ Years', '10,000+ Patients'],
}

/* The six treatments from the client's content brief, in the brief's own
   order. The copy under each title is the brief's line verbatim. */
export const SERVICES = [
  {
    icon: 'ScanFace',
    title: 'Acne & Acne Scar Treatment',
    copy: 'Clear active acne and reduce acne scars with advanced skin treatments.',
  },
  {
    icon: 'Contrast',
    title: 'Pigmentation Treatment',
    copy: 'Reduce melasma, tanning, and uneven skin tone.',
  },
  {
    icon: 'Droplets',
    title: 'Hydra Facial',
    copy: 'Deep cleanse, hydrate, and brighten your skin instantly.',
  },
  {
    icon: 'Zap',
    title: 'Laser Hair Reduction',
    copy: 'Safe and effective laser treatment for long-lasting hair reduction.',
  },
  {
    icon: 'Hourglass',
    title: 'Anti-Ageing Treatment',
    copy: 'Reduce fine lines and improve skin firmness with advanced solutions.',
  },
  {
    icon: 'Sun',
    title: 'Skin Brightening',
    copy: 'Restore healthy, glowing skin with customized treatment plans.',
  },
]

export const WHY_US = [
  {
    icon: 'BadgeCheck',
    title: 'Experienced Skin Specialists',
    copy: 'Every treatment plan is designed and reviewed by qualified specialists.',
  },
  {
    icon: 'ShieldCheck',
    title: 'FDA-Approved Technologies',
    copy: '18+ modern skin treatment options backed by research.',
  },
  {
    icon: 'ClipboardList',
    title: 'Personalised Plans',
    copy: 'No generic packages — every plan is built around your skin type and concern.',
  },
  {
    icon: 'Star',
    title: '4.8★ Rated Clinic',
    copy: 'Trusted by patients across Kovilpatti and nearby towns.',
  },
]

/**
 * The clinic's own skin before/after photographs. They replace six
 * hair-restoration cases carried over from the previous version of this page,
 * every one of which was captioned with a skin result its picture did not
 * show. Five cases, which is inside the brief's "Add 4–6 optimized before &
 * after images".
 *
 * Optimised on the way in: the supplied files were 7620 × 7620 at 6–9 MB each,
 * around 38 MB for the set. They are 1400px JPEGs now, 471 KB all told, which
 * is what makes them shippable in a section that shows one and preloads none.
 *
 * ⚠ THE TREATMENT LABELS ARE INFERRED, NOT SUPPLIED. Each caption describes
 * only what its own photograph visibly shows, but the treatment that produced
 * it is not something a picture can state — these are read off the visible
 * concern. Have the clinic confirm each one before launch: naming the wrong
 * treatment beside a real patient's result is a clinical claim, not a caption.
 *
 * One further case was supplied (70.jpg) and is deliberately not here: its two
 * halves could not be told apart as before and after — the right-hand image
 * shows more pigmentation than the left — so any caption would have asserted a
 * direction the photograph does not support. Add it back once the clinic says
 * which half is which.
 */
export const RESULTS = [
  { src: result1, caption: 'Even tone restored', treatment: 'Pigmentation Treatment' },
  { src: result2, caption: 'Inflamed acne settled', treatment: 'Acne Treatment' },
  { src: result3, caption: 'Acne scarring smoothed', treatment: 'Acne Scar Treatment' },
  { src: result4, caption: 'Pitted scarring softened', treatment: 'Acne Scar Treatment' },
  { src: result5, caption: 'Skin texture refined', treatment: 'Acne Scar Treatment' },
]

/* Google reviews of the Kovilpatti clinic, quoted as written — the same
   reviews the hair page carries, the two that are about skin treatments. */
export const REVIEWS = [
  {
    name: 'Seerin',
    treatment: 'Q-Switch & Facial',
    text: 'I visited the clinic for a Q-switch treatment and a facial, and the experience was amazing! The ambience is super clean, calm and very welcoming. The staff are really polite, friendly and professional — they explain every step clearly and make you feel very comfortable throughout the process.',
  },
  {
    name: 'Rajan Gomes',
    treatment: 'Hydra Facial',
    text: 'I had a Hydra Facial at the clinic and the experience was excellent. My skin felt deeply cleansed, hydrated, and instantly brighter after the session. The procedure was gentle and relaxing, and everything was explained clearly. The clinic maintains good hygiene and professionalism.',
  },
]

export const FAQS = [
  {
    q: 'Which treatment is right for my skin?',
    a: 'Our specialists recommend the best treatment after a detailed skin analysis.',
  },
  {
    q: 'Do you treat acne and acne scars?',
    a: 'Yes. We offer advanced treatments for acne, acne scars, and pigmentation.',
  },
  {
    q: 'Is Laser Hair Reduction safe?',
    a: 'Yes. Our treatments are performed using advanced technology by trained professionals.',
  },
  {
    q: 'How do I book an appointment?',
    a: 'Simply call us or fill out the consultation form, and our Kovilpatti team will contact you.',
  },
  {
    q: 'Where is the clinic located?',
    a: 'We are at 16, First Floor, No. 464, Nellai Bypass Road, near the Fire Station, V.O.C. Nagar, Kadershan Koil, Kovilpatti. Call 080980 56789 and we will guide you.',
  },
]
