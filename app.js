/* =========================================================
   CELESTIAL ATLAS — app.js
   Features:
   · Named-star database with real astronomical data
   · Axial precession simulation (25,772-year cycle)
   · Canvas star map with parallax-style rendering
   · Interactive star data cards
   · Timeline slider + manual year input
   ========================================================= */

'use strict';

// ──────────────────────────────────────────────────────────
//  1. STAR DATABASE
//  All angular coordinates are J2000.0 epoch
//  RA in decimal degrees, Dec in decimal degrees
// ──────────────────────────────────────────────────────────
const STARS = [
  {
    id: 'sirius',
    name: 'Sirius',
    bayer: 'α Canis Majoris',
    constellation: 'Canis Major',
    ra: 101.2875,   // degrees
    dec: -16.7161,
    magnitude: -1.46,
    mass: 2.02,
    radius: 1.711,
    luminosity: 25.4,
    distance: 8.6,
    spectral: 'A1V',
    color: '#b0d8ff',
    size: 5,
    lore: 'The brightest star in Earth\'s night sky. Ancient Egyptians called it Sopdet and used its heliacal rising to predict the annual Nile flood. The Romans called its scorching summer appearance the \'Dog Days\' — dies caniculares. In Babylonian astronomy, Sirius was Kakkab-lik-ud, the \'Star of the Dog\'. Its sheer luminosity has made it a calendrical and navigational anchor for nearly every ancient civilization.'
  },
  {
    id: 'polaris',
    name: 'Polaris',
    bayer: 'α Ursae Minoris',
    constellation: 'Ursa Minor',
    ra: 37.9542,
    dec: 89.2642,
    magnitude: 1.98,
    mass: 5.4,
    radius: 37.5,
    luminosity: 2500,
    distance: 433,
    spectral: 'F7Ib',
    color: '#fff8cc',
    size: 4,
    lore: 'The current northern pole star, within 0.7° of the celestial north pole. Used by navigators for millennia to find true north. Known to the Vikings as Leiðarstjarna (the Lodestar), and to Arabic astronomers as al-Jady (the Billy Goat). Due to axial precession, Polaris was not always the pole star and will gradually drift away over the next several thousand years, eventually returning after 25,772 years.'
  },
  {
    id: 'thuban',
    name: 'Thuban',
    bayer: 'α Draconis',
    constellation: 'Draco',
    ra: 211.0933,
    dec: 64.3759,
    magnitude: 3.65,
    mass: 2.8,
    radius: 4.93,
    luminosity: 174,
    distance: 303,
    spectral: 'A0III',
    color: '#e0f0ff',
    size: 3,
    lore: 'Thuban was the pole star around 2750 BCE — the era of the ancient Egyptian Old Kingdom and the construction of the Great Pyramid. The pyramid\'s descending passage is thought to have been aligned to Thuban so that the pharaoh\'s soul could ascend toward the circumpolar stars that never set. Its name derives from the Arabic for \'head of the serpent\'. It will become the pole star again in approximately 20,346 CE.'
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    bayer: 'α Orionis',
    constellation: 'Orion',
    ra: 88.7929,
    dec: 7.4071,
    magnitude: 0.42,
    mass: 16.5,
    radius: 887,
    luminosity: 90000,
    distance: 700,
    spectral: 'M1Ia',
    color: '#ff8040',
    size: 5,
    lore: 'A red supergiant so vast that if placed at the Sun\'s position, it would engulf Mercury, Venus, Earth, and Mars. Arabic astronomers named it Ibt al-Jauza\', meaning \'armpit of the central one\'. It will end its life in a spectacular supernova, bright enough to cast shadows at night, sometime within the next 100,000 years. A dramatic dimming event in 2019–2020 known as the Great Dimming temporarily raised speculation that the explosion was imminent.'
  },
  {
    id: 'rigel',
    name: 'Rigel',
    bayer: 'β Orionis',
    constellation: 'Orion',
    ra: 78.6344,
    dec: -8.2016,
    magnitude: 0.13,
    mass: 21.0,
    radius: 78.9,
    luminosity: 120000,
    distance: 860,
    spectral: 'B8Ia',
    color: '#a8d8ff',
    size: 5,
    lore: 'One of the most intrinsically luminous stars visible to the naked eye — a blue supergiant burning at over 10,000 Kelvin. Its name comes from the Arabic Rijl Jauzah al-Yusra, meaning \'the left foot of the central one\'. Ancient Egyptians associated Rigel with Sah, the celestial manifestation of Osiris, and the star was integral to religious astronomical observations at Karnak and other temple complexes.'
  },
  {
    id: 'vega',
    name: 'Vega',
    bayer: 'α Lyrae',
    constellation: 'Lyra',
    ra: 279.2347,
    dec: 38.7837,
    magnitude: 0.03,
    mass: 2.135,
    radius: 2.362,
    luminosity: 40.12,
    distance: 25.04,
    spectral: 'A0Va',
    color: '#d0e8ff',
    size: 5,
    lore: 'The fifth brightest star in the night sky and the second brightest in the northern hemisphere. Vega served as the northern pole star around 12,000 BCE and will do so again near 13,727 CE. It was the first star (other than the Sun) to be photographed, in 1850. Vega is the standard calibration star for astronomical photometry and defined the zero-point of the magnitude scale. In Chinese mythology, Vega is Zhinü, the Weaver Girl, separated from her lover Altair by the Milky Way.'
  },
  {
    id: 'altair',
    name: 'Altair',
    bayer: 'α Aquilae',
    constellation: 'Aquila',
    ra: 297.6958,
    dec: 8.8683,
    magnitude: 0.77,
    mass: 1.86,
    radius: 1.63,
    luminosity: 10.6,
    distance: 16.73,
    spectral: 'A7V',
    color: '#e8f0ff',
    size: 4,
    lore: 'One of the three stars of the prominent Summer Triangle asterism, Altair spins so rapidly — once every 9 hours — that it is notably flattened at the poles. In Chinese legend, Altair is Niulang, the Cowherd, and forms the stellar counterpart to Vega across the Milky Way. The two are reunited once a year when magpies form a bridge across the galaxy — celebrated in the Qixi Festival. Altair\'s name derives from the Arabic for \'the flying eagle\'.'
  },
  {
    id: 'aldebaran',
    name: 'Aldebaran',
    bayer: 'α Tauri',
    constellation: 'Taurus',
    ra: 68.9798,
    dec: 16.5093,
    magnitude: 0.87,
    mass: 1.16,
    radius: 44.2,
    luminosity: 518,
    distance: 65.3,
    spectral: 'K5III',
    color: '#ff9060',
    size: 4,
    lore: 'A red giant and one of the four Royal Stars of ancient Persia, known as Tascheter. Aldebaran marked the vernal equinox around 3000 BCE, making it one of the most important navigational stars of antiquity. Its name derives from the Arabic al-Dabarān, meaning \'the follower\' — as it follows the Pleiades star cluster across the sky. The NASA Pioneer 10 probe is headed in the approximate direction of Aldebaran and will pass within 68 light-years of it in about 2 million years.'
  },
  {
    id: 'capella',
    name: 'Capella',
    bayer: 'α Aurigae',
    constellation: 'Auriga',
    ra: 79.1722,
    dec: 45.9980,
    magnitude: 0.08,
    mass: 2.5,
    radius: 11.98,
    luminosity: 78.7,
    distance: 42.9,
    spectral: 'G5III + G0III',
    color: '#ffee88',
    size: 4,
    lore: 'The sixth brightest star in the night sky and the brightest in the constellation Auriga. Capella is actually a close binary system of two giant yellow stars. Revered by ancient Mesopotamians as the Goat Star or Iku, it was important in Babylonian astrology. In Roman mythology it represented the goat Amalthea who nursed the infant Jupiter. To the ancient Greeks it was the \'she-goat\', and its rising heralded stormy weather. Aboriginal Australians in several traditions associated Capella with ceremonial knowledge.'
  },
  {
    id: 'antares',
    name: 'Antares',
    bayer: 'α Scorpii',
    constellation: 'Scorpius',
    ra: 247.3519,
    dec: -26.4320,
    magnitude: 0.96,
    mass: 12.0,
    radius: 700,
    luminosity: 57500,
    distance: 550,
    spectral: 'M1.5Iab',
    color: '#ff6030',
    size: 5,
    lore: 'A red supergiant so large it would extend beyond the orbit of Jupiter if placed at the Sun\'s center. Antares is one of the four Royal Stars of ancient Persia (Satevis), and one of Babylonian astronomy\'s most-observed stars. Its name means \'rival of Mars\' in Greek, because its reddish hue resembles the planet. The ancient Egyptians, Chinese, and Polynesian navigators all used it as a key wayfinding star. Like Betelgeuse, Antares is a supernova candidate expected to explode within the next million years.'
  },
  {
    id: 'deneb',
    name: 'Deneb',
    bayer: 'α Cygni',
    constellation: 'Cygnus',
    ra: 310.3579,
    dec: 45.2803,
    magnitude: 1.25,
    mass: 19.0,
    radius: 203,
    luminosity: 196000,
    distance: 2616,
    spectral: 'A2Ia',
    color: '#d8eeff',
    size: 4,
    lore: 'Despite appearing only moderately bright to the naked eye, Deneb is one of the most luminous stars known — if it were as close as Sirius, it would cast visible shadows. The tail of the celestial swan Cygnus, its name derives from the Arabic for \'tail\'. It forms the third vertex of the Summer Triangle alongside Vega and Altair. Deneb was the pole star approximately 18,000 years ago and will again serve as the northern pole star around the year 9,800 CE.'
  },
  {
    id: 'fomalhaut',
    name: 'Fomalhaut',
    bayer: 'α Piscis Austrini',
    constellation: 'Piscis Austrinus',
    ra: 344.4127,
    dec: -29.6223,
    magnitude: 1.16,
    mass: 1.92,
    radius: 1.842,
    luminosity: 16.63,
    distance: 25.13,
    spectral: 'A3V',
    color: '#c0e0ff',
    size: 4,
    lore: 'The Loneliest Star — so called because it is the only bright star in a large region of the southern autumn sky. One of the four Royal Stars of Persian astronomy (Hastorang), it marked the winter solstice around 2500 BCE. Its name comes from the Arabic Fum al-Ḥūt, \'mouth of the southern fish\'. Fomalhaut made astronomical history in 2008 when Hubble Space Telescope captured the first visible-light image of an exoplanet candidate (later disputed) in its debris disk.'
  },
  {
    id: 'spica',
    name: 'Spica',
    bayer: 'α Virginis',
    constellation: 'Virgo',
    ra: 201.2983,
    dec: -11.1613,
    magnitude: 0.98,
    mass: 10.25,
    radius: 7.47,
    luminosity: 12100,
    distance: 250,
    spectral: 'B1V + B2V',
    color: '#90c8ff',
    size: 4,
    lore: 'The brightest star in Virgo and the 15th brightest overall, Spica is actually a spectroscopic binary where two massive blue stars orbit each other so closely they are egg-shaped by tidal forces. The Greek astronomer Hipparchus used Spica to discover the precession of the equinoxes around 127 BCE by comparing his observations with historical records. In Hindu astronomy, Spica defines the nakshatra Chitrā and was known as a \'bright lamp of heaven\'.'
  },
  {
    id: 'pollux',
    name: 'Pollux',
    bayer: 'β Geminorum',
    constellation: 'Gemini',
    ra: 116.3289,
    dec: 28.0262,
    magnitude: 1.16,
    mass: 1.86,
    radius: 8.8,
    luminosity: 32.7,
    distance: 33.78,
    spectral: 'K0IIIb',
    color: '#ffcc80',
    size: 4,
    lore: 'The brightest star in Gemini, Pollux is an orange giant and the nearest giant star to Earth. In Greek mythology, Pollux and his twin brother Castor were the Dioscuri — the divine twins and patrons of sailors. Pollux was the immortal twin, son of Zeus, while Castor was mortal. In 2006, an exoplanet was confirmed orbiting Pollux — Pollux b (Thestias) — making it one of the first giant stars confirmed to host a planet.'
  },
  {
    id: 'regulus',
    name: 'Regulus',
    bayer: 'α Leonis',
    constellation: 'Leo',
    ra: 152.0929,
    dec: 11.9672,
    magnitude: 1.35,
    mass: 3.8,
    radius: 4.35,
    luminosity: 363,
    distance: 79.3,
    spectral: 'B7V',
    color: '#b0d0ff',
    size: 4,
    lore: 'The fourth Royal Star of ancient Persian astronomy (Venant), Regulus was known as the \'King Star\' or \'Little King\'. Its name in Latin means \'little prince\'. Marked the summer solstice around 3000 BCE and was considered enormously powerful in astrology — said to bring glory and riches to those born under its influence. Regulus spins so rapidly that it completes a rotation in under 16 hours, causing its equatorial diameter to bulge measurably. In Babylonian astronomy it was Sharru, the king.'
  },
  {
    id: 'kochab',
    name: 'Kochab',
    bayer: '\u03b2 Ursae Minoris',
    constellation: 'Ursa Minor',
    ra: 222.6764,
    dec: 74.1555,
    magnitude: 2.08,
    mass: 2.2,
    radius: 42,
    luminosity: 390,
    distance: 131,
    spectral: 'K4III',
    color: '#ffb27a',
    size: 4,
    lore: 'The bright orange giant at the lip of the Little Dipper\'s bowl, Kochab served as the pole star from roughly 1500 BCE to 500 CE — the era of the Egyptian New Kingdom, classical Greece and Rome. Ancient Greek mariners navigated by it alongside Polaris, which they called Phoenike. Its name derives from the Arabic al-kawkab, simply \'the star\'. Kochab is a red giant about 42 times the Sun\'s radius, and together with its neighbour Pherkad it forms the \'Guardians of the Pole\'.'
  },
  {
    id: 'errai',
    name: 'Errai',
    bayer: '\u03b3 Cephei',
    constellation: 'Cepheus',
    ra: 354.8368,
    dec: 77.6323,
    magnitude: 3.21,
    mass: 1.4,
    radius: 4.9,
    luminosity: 10.6,
    distance: 45,
    spectral: 'K1IV',
    color: '#ffcf9e',
    size: 3,
    lore: 'Errai will be the closest bright star to the north celestial pole around 4000 CE, inheriting the title of pole star from Polaris. Its name comes from the Arabic al-irai, \'the shepherd\'. In 1988 it became one of the very first stars ever announced to host an exoplanet — a claim confirmed decades later — making Gamma Cephei Ab a landmark in the history of planet hunting. It is an evolving subgiant beginning its swelling toward old age.'
  },
  {
    id: 'alderamin',
    name: 'Alderamin',
    bayer: '\u03b1 Cephei',
    constellation: 'Cepheus',
    ra: 319.645,
    dec: 62.5855,
    magnitude: 2.46,
    mass: 1.9,
    radius: 2.7,
    luminosity: 17,
    distance: 49,
    spectral: 'A8V',
    color: '#dfe8ff',
    size: 3,
    lore: 'The brightest star of Cepheus, Alderamin takes its turn as the north pole star around 7500 CE as the precessional cone sweeps on. Its Arabic name means \'the right forearm\'. It is a remarkably fast rotator — spinning at up to 245 km/s, over a hundred times faster than the Sun — which blurs its surface features and makes it one of the classic targets of stellar rotation studies. To Chinese astronomers it marked the right wall of the celestial imperial enclosure.'
  },
  {
    id: 'iota-cephei',
    name: 'Iota Cephei',
    bayer: '\u03b9 Cephei',
    constellation: 'Cepheus',
    ra: 342.5783,
    dec: 66.2,
    magnitude: 3.52,
    mass: 2.0,
    radius: 11,
    luminosity: 57,
    distance: 115,
    spectral: 'K0III',
    color: '#ffd9a8',
    size: 3,
    lore: 'An orange giant that will pass within about 3 degrees of the north celestial pole around 5200 CE, briefly rivaling Errai for the role of pole star before Alderamin\'s era. Little noticed today in the fainter reaches of Cepheus, it is nonetheless a swollen giant over ten times the Sun\'s radius, burning helium in a shell around its core as it ages.'
  },
  {
    id: 'polaris-australis',
    name: 'Polaris Australis',
    bayer: '\u03c3 Octantis',
    constellation: 'Octans',
    ra: 317.1913,
    dec: -88.9572,
    magnitude: 5.47,
    mass: 1.5,
    radius: 2.4,
    luminosity: 9,
    distance: 29.4,
    spectral: 'F0III',
    color: '#f2f0ff',
    size: 3,
    lore: 'The southern pole star — and a poor one. Sigma Octantis sits barely a degree from the south celestial pole, but at magnitude 5.5 it is nearly at the limit of naked-eye vision, a humiliating contrast to brilliant Polaris in the north. The IAU officially named it Polaris Australis in 2017. It is a Delta Scuti variable, pulsing gently, and for southern navigators the true guide is instead the bright Southern Cross, whose long axis points at the pole.'
  },
  {
    id: 'beta-hydri',
    name: 'Beta Hydri',
    bayer: '\u03b2 Hydri',
    constellation: 'Hydrus',
    ra: 6.4371,
    dec: -77.2541,
    magnitude: 2.80,
    mass: 1.1,
    radius: 1.8,
    luminosity: 3.5,
    distance: 24.3,
    spectral: 'G2IV',
    color: '#fff3c9',
    size: 3,
    lore: 'The brightest star near the south celestial pole, and a near-twin of our own Sun just entering old age — a yellow subgiant only 24 light-years away. As precession carries the pole onward, Beta Hydri will be the closest reasonably bright star to the south celestial pole for millennia after Sigma Octantis drifts away, making it the future \'southern Polaris\'. It hosts a known debris disk and was an early target in the search for extrasolar planets.'
  }

];

// ──────────────────────────────────────────────────────────
//  2. PRECESSION ENGINE (long-term model)
//  The celestial poles sweep circles of radius = obliquity (ε)
//  around the ecliptic poles.  We work in ecliptic coordinates,
//  which are fixed under axial precession:
//    · ecliptic longitude drifts by 360° / 25,772 yr
//    · obliquity oscillates ±~1° over a 41,000-year cycle
//  This stays accurate across the full ±50,000-year range,
//  unlike short-term IAU polynomials.
// ──────────────────────────────────────────────────────────
const PRECESSION = {
  PERIOD: 25772,            // years per precession cycle
  REF_YEAR: 2000,           // J2000.0
  OBLIQUITY_J2000: 23.4392911,
  OBLIQUITY_AMP: 0.95,      // degrees, half-amplitude of the 41-kyr cycle
  OBLIQUITY_PERIOD: 41000,  // years
  OBLIQUITY_PEAK_YEAR: -8500,
  EPOCH_MIN: -50000,
  EPOCH_MAX: 50000,
  VIEW_DEG: 115             // degrees of sky shown from pole to rim
};

const RAD = Math.PI / 180;

function toRad(deg) { return deg * RAD; }
function toDeg(rad) { return rad * 180 / Math.PI; }

/**
 * Mean obliquity of the ecliptic at a given year.
 * Calibrated so that obliquityAt(2000) === OBLIQUITY_J2000 exactly.
 */
function obliquityAt(year) {
  const p = PRECESSION;
  const phase = 2 * Math.PI * (year - p.OBLIQUITY_PEAK_YEAR) / p.OBLIQUITY_PERIOD;
  const refPhase = 2 * Math.PI * (p.REF_YEAR - p.OBLIQUITY_PEAK_YEAR) / p.OBLIQUITY_PERIOD;
  return p.OBLIQUITY_J2000 + p.OBLIQUITY_AMP * (Math.cos(phase) - Math.cos(refPhase));
}

/**
 * Equatorial (RA, Dec) -> ecliptic (λ, β), given obliquity ε.
 */
function equatorialToEcliptic(raDeg, decDeg, epsDeg) {
  const ra = raDeg * RAD, dec = decDeg * RAD, eps = epsDeg * RAD;
  const sinBeta = Math.sin(dec) * Math.cos(eps) - Math.cos(dec) * Math.sin(eps) * Math.sin(ra);
  const cosBetaSinLam = Math.sin(dec) * Math.sin(eps) + Math.cos(dec) * Math.cos(eps) * Math.sin(ra);
  const cosBetaCosLam = Math.cos(dec) * Math.cos(ra);
  const beta = toDeg(Math.asin(Math.max(-1, Math.min(1, sinBeta))));
  let lam = toDeg(Math.atan2(cosBetaSinLam, cosBetaCosLam));
  if (lam < 0) lam += 360;
  return { lam, beta };
}

/**
 * Ecliptic (λ, β) -> equatorial (RA, Dec), given obliquity ε.
 */
function eclipticToEquatorial(lamDeg, betaDeg, epsDeg) {
  const lam = lamDeg * RAD, beta = betaDeg * RAD, eps = epsDeg * RAD;
  const sinBeta = Math.sin(beta), cosBeta = Math.cos(beta);
  const sinLam = Math.sin(lam), cosLam = Math.cos(lam);
  const sinDec = sinBeta * Math.cos(eps) + cosBeta * Math.sin(eps) * sinLam;
  const dec = toDeg(Math.asin(Math.max(-1, Math.min(1, sinDec))));
  let ra = toDeg(Math.atan2(cosBeta * sinLam * Math.cos(eps) - sinBeta * Math.sin(eps), cosBeta * cosLam));
  if (ra < 0) ra += 360;
  return { ra, dec };
}

/**
 * Apply axial precession (and the slow obliquity cycle) to a
 * star's J2000 equatorial coordinates for a given year.
 */
function applyPrecession(raDeg, decDeg, year) {
  const e = equatorialToEcliptic(raDeg, decDeg, PRECESSION.OBLIQUITY_J2000);
  const lam = e.lam + 360 * (year - PRECESSION.REF_YEAR) / PRECESSION.PERIOD;
  return eclipticToEquatorial(lam, e.beta, obliquityAt(year));
}

/**
 * Position of the ecliptic pole in the *date* equatorial frame.
 * Its angular distance from the celestial pole is exactly ε(date).
 */
function getEclipticPolePosition(year) {
  return eclipticToEquatorial(90, 90, obliquityAt(year));
}

function angularDistance(ra1, dec1, ra2, dec2) {
  const r1 = toRad(ra1); const d1 = toRad(dec1);
  const r2 = toRad(ra2); const d2 = toRad(dec2);
  const cosAngle =
    Math.sin(d1) * Math.sin(d2) +
    Math.cos(d1) * Math.cos(d2) * Math.cos(r1 - r2);
  return toDeg(Math.acos(Math.max(-1, Math.min(1, cosAngle))));
}

// ──────────────────────────────────────────────────────────
//  3. UNIFIED STAR CATALOG
//  Merges the rich named-star entries above with the full
//  naked-eye catalog (stars-data.js) and precomputes, for every
//  star, its fixed ecliptic coordinates and proper-motion drift.
// ──────────────────────────────────────────────────────────
const ALL_STARS = [];

function buildCatalog(CATALOG, STAR_NAMES, CONSTELLATION_NAMES) {
  CATALOG.forEach(rec => {
    ALL_STARS.push({
      ra: rec[0], dec: rec[1], magnitude: rec[2], bv: rec[3],
      pmRA: rec[4], pmDE: rec[5], hr: rec[6], spectral: rec[7],
      constAbbr: rec[8],
      name: STAR_NAMES[rec[6]] || null,
      constellation: CONSTELLATION_NAMES[rec[8]] || rec[8] || '',
      lore: null, mass: null, radius: null, luminosity: null, distance: null
    });
  });

  // Attach rich entries (lore, physics) to their catalog stars by position
  STARS.forEach(rich => {
    let best = null, bestD = 0.1;
    ALL_STARS.forEach(s => {
      const d = angularDistance(s.ra, s.dec, rich.ra, rich.dec);
      if (d < bestD) { bestD = d; best = s; }
    });
    if (best) {
      best.name = best.name || rich.name;
      best.lore = rich.lore;
      best.mass = rich.mass;
      best.radius = rich.radius;
      best.luminosity = rich.luminosity;
      best.distance = rich.distance;
      best.bayer = rich.bayer;
      best.spectral = best.spectral || rich.spectral;
    }
  });

  // Precompute ecliptic coordinates (fixed under precession)
  ALL_STARS.forEach(s => {
    const e = equatorialToEcliptic(s.ra, s.dec, PRECESSION.OBLIQUITY_J2000);
    s.eclLon = e.lam;
    s.eclLat = e.beta;
    const bR = e.beta * RAD;
    s.sinBeta = Math.sin(bR);
    s.cosBeta = Math.cos(bR);
    // Proper motion, expressed as a slow drift in the ecliptic frame
    if (s.pmRA || s.pmDE) {
      const cosD = Math.max(0.05, Math.cos(s.dec * RAD));
      const ra2 = s.ra + (s.pmRA / 3600) / cosD;
      const dec2 = s.dec + s.pmDE / 3600;
      const e2 = equatorialToEcliptic(ra2, dec2, PRECESSION.OBLIQUITY_J2000);
      let dl = e2.lam - e.lam;
      if (dl > 180) dl -= 360;
      if (dl < -180) dl += 360;
      s.pmLam = dl;
      s.pmBeta = e2.beta - e.beta;
    } else {
      s.pmLam = 0;
      s.pmBeta = 0;
    }
  });
}

/**
 * Compute date-frame equatorial positions of every catalog star
 * for a given year.  Cached per year; shared by both hemispheres.
 */
let skyCache = { year: NaN, positions: null, obliquity: 0 };

function computeSky(year) {
  if (skyCache.year === year) return skyCache;
  const dt = year - PRECESSION.REF_YEAR;
  const lamShift = 360 * dt / PRECESSION.PERIOD;
  const eps = obliquityAt(year);
  const epsR = eps * RAD;
  const sinE = Math.sin(epsR), cosE = Math.cos(epsR);
  const positions = new Array(ALL_STARS.length);
  for (let i = 0; i < ALL_STARS.length; i++) {
    const s = ALL_STARS[i];
    const lam = (s.eclLon + lamShift + s.pmLam * dt) * RAD;
    const beta = s.eclLat + s.pmBeta * dt;
    const sinL = Math.sin(lam), cosL = Math.cos(lam);
    const sinDec = s.sinBeta * cosE + s.cosBeta * sinE * sinL;
    const dec = toDeg(Math.asin(Math.max(-1, Math.min(1, sinDec))));
    let ra = toDeg(Math.atan2(s.cosBeta * sinL * cosE - s.sinBeta * sinE, s.cosBeta * cosL));
    if (ra < 0) ra += 360;
    positions[i] = { ra, dec };
  }
  skyCache = { year, positions, obliquity: eps };
  return skyCache;
}

function displayName(s) {
  return s.name || (s.hr ? 'HR ' + s.hr : 'Unnamed star');
}

/**
 * Nearest naked-eye star to the celestial pole for a hemisphere.
 */
function getPoleStarInfo(year, hemisphere) {
  const { positions } = computeSky(year);
  let best = 0;
  let bestDec = hemisphere === 'north' ? -Infinity : Infinity;
  for (let i = 0; i < positions.length; i++) {
    const d = positions[i].dec;
    if (hemisphere === 'north' ? d > bestDec : d < bestDec) { bestDec = d; best = i; }
  }
  const s = ALL_STARS[best];
  const dist = hemisphere === 'north' ? 90 - bestDec : bestDec + 90;
  let detail = `${s.constellation || '—'} · mag ${s.magnitude.toFixed(2)} · ${dist.toFixed(1)}° from pole`;
  if (!s.name) {
    let named = null, namedD = 8;
    for (let i = 0; i < positions.length; i++) {
      if (!ALL_STARS[i].name) continue;
      const d = angularDistance(positions[i].ra, positions[i].dec, positions[best].ra, positions[best].dec);
      if (d < namedD) { namedD = d; named = ALL_STARS[i]; }
    }
    if (named) detail += ` · ${displayName(named)} ${namedD.toFixed(1)}° away`;
  }
  return {
    star: s,
    dist,
    name: displayName(s),
    detail
  };
}

// ──────────────────────────────────────────────────────────
//  4. DUAL-HEMISPHERE STAR MAP RENDERER
// ──────────────────────────────────────────────────────────

// Black-body-ish color from B−V color index (Ballesteros approximation)
function bvToColor(bv) {
  const t = 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62));
  let r, g, b;
  if (t <= 66) {
    r = 255;
    g = 99.47 * Math.log(t) - 161.12;
  } else {
    r = 329.7 * Math.pow(t - 60, -0.1332);
    g = 288.12 * Math.pow(t - 60, -0.0755);
  }
  if (t >= 66) b = 255;
  else if (t <= 19) b = 0;
  else b = 138.52 * Math.log(t - 10) - 305.04;
  const cl = v => Math.max(0, Math.min(255, Math.round(v)));
  return `rgb(${cl(r)},${cl(g)},${cl(b)})`;
}

class HemisphereMap {
  constructor(canvasEl, hemisphere) {
    this.canvas = canvasEl;
    this.ctx    = canvasEl.getContext('2d');
    this.hemisphere = hemisphere; // 'north' | 'south'
    this.year   = 2026;
    this.hoveredIndex = -1;
    this.onStarClick = null;
    this.screenPositions = [];

    this._bindEvents();
    this.resize();
  }

  _bindEvents() {
    this.canvas.addEventListener('mousemove', this._onMouseMove.bind(this));
    this.canvas.addEventListener('click',     this._onClick.bind(this));
    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredIndex = -1;
      this.canvas.style.cursor = 'crosshair';
      this._scheduleRedraw();
    });
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    const container = this.canvas.parentElement;
    const size = Math.min(
      container.offsetWidth - 2,
      window.innerHeight * 0.62
    );
    const sz = Math.max(300, Math.floor(size));
    this.canvas.width  = sz;
    this.canvas.height = sz;
    this.size = sz;
    this._scheduleRedraw();
  }

  setYear(year) {
    this.year = year;
    this._scheduleRedraw();
  }

  _scheduleRedraw() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(() => this.draw());
  }

  // Polar azimuthal-equidistant projection centred on the
  // celestial pole of this hemisphere. RA runs counter-
  // clockwise in the north view, clockwise in the south view
  // (both as seen from beyond the pole, like real planispheres).
  _project(raDeg, decDeg) {
    const poleDist = this.hemisphere === 'north' ? 90 - decDeg : 90 + decDeg;
    const maxDeg = PRECESSION.VIEW_DEG;
    const r = (poleDist / maxDeg) * (this.size * 0.5 - 8);
    const a = raDeg * RAD;
    const s = Math.sin(a), c = Math.cos(a);
    const cx = this.size * 0.5, cy = this.size * 0.5;
    if (this.hemisphere === 'north') {
      return { x: cx - r * s, y: cy - r * c, poleDist };
    }
    return { x: cx + r * s, y: cy - r * c, poleDist };
  }

  draw() {
    const ctx = this.ctx;
    const sz  = this.size;
    const cx  = sz * 0.5;
    const cy  = sz * 0.5;

    ctx.clearRect(0, 0, sz, sz);

    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sz * 0.5);
    bgGrad.addColorStop(0,   '#0c1128');
    bgGrad.addColorStop(0.6, '#060810');
    bgGrad.addColorStop(1,   '#030408');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.5 - 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.5 - 1, 0, Math.PI * 2);
    ctx.clip();

    this._drawGrid(ctx, cx, cy);
    this._drawPrecessionPath(ctx, cx, cy);
    this._drawEclipticPole(ctx, cx, cy);
    this._drawStars(ctx);

    ctx.restore();

    ctx.strokeStyle = 'rgba(160, 140, 80, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.5 - 1, 0, Math.PI * 2);
    ctx.stroke();

    this._drawPoleMarker(ctx, cx, cy);
  }

  _drawGrid(ctx, cx, cy) {
    const R = this.size * 0.5 - 8;
    const maxDeg = PRECESSION.VIEW_DEG;
    ctx.strokeStyle = 'rgba(180, 150, 70, 0.09)';
    ctx.lineWidth = 1;
    ctx.font = "10px 'Cinzel', serif";
    ctx.fillStyle = 'rgba(180, 150, 70, 0.4)';
    [[30, '60°'], [60, '30°'], [90, 'EQUATOR']].forEach(([d, label]) => {
      const r = (d / maxDeg) * R;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillText(label, cx + r * 0.7071 + 3, cy - r * 0.7071 - 3);
    });
  }

  _drawPrecessionPath(ctx, cx, cy) {
    // Path of the celestial pole over one full precession cycle,
    // sampled through the obliquity oscillation (an annulus band).
    const steps = 480;
    const startYear = this.year - PRECESSION.PERIOD / 2;
    ctx.save();
    ctx.setLineDash([4, 8]);
    ctx.strokeStyle = 'rgba(180, 140, 50, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const yr = startYear + (i / steps) * PRECESSION.PERIOD;
      const ep = getEclipticPolePosition(yr);
      const p = this._project(ep.ra, ep.dec);
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();
  }

  _drawEclipticPole(ctx, cx, cy) {
    const ep = getEclipticPolePosition(this.year);
    const p = this._project(ep.ra, ep.dec);
    ctx.strokeStyle = 'rgba(212, 170, 80, 0.55)';
    ctx.lineWidth = 1.2;
    const len = 6;
    ctx.beginPath();
    ctx.moveTo(p.x - len, p.y - len); ctx.lineTo(p.x + len, p.y + len);
    ctx.moveTo(p.x - len, p.y + len); ctx.lineTo(p.x + len, p.y - len);
    ctx.stroke();
    ctx.fillStyle = 'rgba(212, 170, 80, 0.55)';
    ctx.font = "10px 'Cinzel', serif";
    ctx.fillText('ECLIPTIC POLE', p.x + 9, p.y + 3);
  }

  _drawStars(ctx) {
    const { positions } = computeSky(this.year);
    const maxDeg = PRECESSION.VIEW_DEG;
    const sz = this.size;
    this.screenPositions = [];

    const poleStar = getPoleStarInfo(this.year, this.hemisphere);

    // Dim first, bright last
    const order = [];
    for (let i = 0; i < ALL_STARS.length; i++) {
      const p = this._project(positions[i].ra, positions[i].dec);
      if (p.poleDist > maxDeg) continue;
      if (p.x < 2 || p.x > sz - 2 || p.y < 2 || p.y > sz - 2) continue;
      order.push({ i, p });
    }
    order.sort((a, b) => ALL_STARS[b.i].magnitude - ALL_STARS[a.i].magnitude);

    order.forEach(({ i, p }) => {
      const s = ALL_STARS[i];
      const isHovered = i === this.hoveredIndex;
      const isPole = poleStar.star === s;
      const r = Math.max(0.7, 3.3 - 0.5 * s.magnitude);

      if (s.magnitude < 1.5 || isHovered || isPole) {
        const glowR = r * (isHovered || isPole ? 5 : 3.5);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        glow.addColorStop(0, 'rgba(220,230,255,0.9)');
        glow.addColorStop(1, 'rgba(220,230,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, isHovered ? r + 1 : r, 0, Math.PI * 2);
      ctx.fillStyle = s.fillColor || (s.fillColor = bvToColor(s.bv));
      ctx.fill();

      if (isPole) {
        ctx.strokeStyle = 'rgba(96, 200, 255, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      const showLabel = isHovered || isPole || (s.name && s.magnitude <= 1.6);
      if (showLabel) {
        ctx.globalAlpha = isHovered || isPole ? 1 : 0.7;
        ctx.fillStyle = isPole ? '#8fd4ff' : 'rgba(230,225,210,0.95)';
        ctx.font = `${isHovered || isPole ? 600 : 400} ${isHovered || isPole ? 12 : 11}px 'Cinzel', serif`;
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 4;
        const label = isPole ? `${displayName(s)} — POLE STAR` : displayName(s);
        ctx.fillText(label, p.x + r + 5, p.y + 4);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      this.screenPositions.push({ x: p.x, y: p.y, i });
    });
  }

  _drawPoleMarker(ctx, cx, cy) {
    const r = 4;
    ctx.strokeStyle = 'rgba(96, 200, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
    ctx.stroke();
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0, 'rgba(140, 220, 255, 1)');
    grd.addColorStop(1, 'rgba(60, 180, 255, 0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  _getCanvasPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  _findHovered(mx, my) {
    let found = -1, minDist = 14;
    this.screenPositions.forEach(({ x, y, i }) => {
      const d = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
      if (d < minDist) { minDist = d; found = i; }
    });
    return found;
  }

  _onMouseMove(e) {
    const { x, y } = this._getCanvasPos(e);
    const idx = this._findHovered(x, y);
    if (idx !== this.hoveredIndex) {
      this.hoveredIndex = idx;
      this.canvas.style.cursor = idx >= 0 ? 'pointer' : 'crosshair';
      this._scheduleRedraw();
    }
  }

  _onClick(e) {
    const { x, y } = this._getCanvasPos(e);
    const idx = this._findHovered(x, y);
    if (idx >= 0 && this.onStarClick) {
      this.onStarClick(ALL_STARS[idx]);
    }
  }
}

// ──────────────────────────────────────────────────────────
//  5. YEAR FORMATTING HELPERS
// ──────────────────────────────────────────────────────────

function formatYear(year) {
  const y = Math.round(year);
  if (y > 0) return `${y.toLocaleString('en-US')} CE`;
  if (y === 0) return '1 BCE';
  return `${(-y).toLocaleString('en-US')} BCE`;
}

function clampYear(y) {
  return Math.max(PRECESSION.EPOCH_MIN, Math.min(PRECESSION.EPOCH_MAX, Math.round(y)));
}

// ──────────────────────────────────────────────────────────
//  6. STAR CARD UI
// ──────────────────────────────────────────────────────────

function openStarCard(star, year) {
  const set = (id, v) => { document.getElementById(id).textContent = v; };
  set('cardStarName', displayName(star));
  set('cardConstellation', star.constellation || '—');
  set('cardBayer', star.bayer || (star.hr ? `HR ${star.hr}` : '—'));
  set('cardDistance', star.distance != null ? star.distance.toLocaleString() : '—');
  set('cardMass', star.mass != null ? star.mass.toFixed(2) : '—');
  set('cardRadius', star.radius != null
    ? (star.radius >= 10 ? star.radius.toLocaleString() : star.radius.toFixed(2))
    : '—');
  set('cardLuminosity', star.luminosity != null
    ? (star.luminosity >= 1000 ? star.luminosity.toLocaleString() : star.luminosity.toFixed(1))
    : '—');
  set('cardSpectral', star.spectral || '—');
  set('cardMagnitude', star.magnitude != null ? star.magnitude.toFixed(2) : '—');
  set('cardLore', star.lore ||
    (star.name
      ? 'An IAU-named star of the naked-eye sky. Its cultural stories vary across civilizations — and its position on these maps shifts with the slow wobble of Earth\'s axis.'
      : 'A naked-eye star from the Yale Bright Star Catalog. Every star you can see from a dark site on Earth is plotted on these hemispheres.'));

  const glyph = document.getElementById('cardGlyph');
  const color = star.fillColor || bvToColor(star.bv || 0.6);
  glyph.style.color = color;
  glyph.style.textShadow = `0 0 20px ${color}99, 0 0 40px ${color}44`;

  const { positions } = computeSky(year);
  const idx = ALL_STARS.indexOf(star);
  const noteEl  = document.getElementById('cardPrecessionNote');
  const noteText = document.getElementById('cardPrecessionText');

  if (idx >= 0) {
    const dec = positions[idx].dec;
    const distN = Math.abs(90 - dec);
    const distS = Math.abs(90 + dec);
    if (distN < 8 || distS < 8) {
      const hemi = distN < distS ? 'north' : 'south';
      const dist = Math.min(distN, distS);
      let msg;
      if (dist < 2) {
        msg = `${displayName(star)} is the current pole star for ${formatYear(year)}, sitting only ${dist.toFixed(1)}° from the celestial ${hemi} pole.`;
      } else {
        msg = `${displayName(star)} is close to the celestial ${hemi} pole for ${formatYear(year)} — just ${dist.toFixed(1)}° away.`;
      }
      noteText.textContent = msg;
      noteEl.style.display = 'flex';
    } else {
      noteEl.style.display = 'none';
    }
  } else {
    noteEl.style.display = 'none';
  }

  const backdrop = document.getElementById('modalBackdrop');
  backdrop.setAttribute('aria-hidden', 'false');
  backdrop.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
}

function closeStarCard() {
  const backdrop = document.getElementById('modalBackdrop');
  backdrop.classList.remove('is-visible');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ──────────────────────────────────────────────────────────
//  7. APP INITIALISATION
// ──────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────────────────
//  6b. CATALOG DATA LOADING
// ──────────────────────────────────────────────────────────────────────────

const BSC5_BASE = 'https://raw.githubusercontent.com/brettonw/YaleBrightStarCatalog/abffb3b7223ae37e879b0a3ff5b49ad06aed5576/';

const IAU_STAR_NAMES = {"15":"Alpheratz","21":"Caph","39":"Algenib","99":"Ankaa","130":"Cexing","153":"Fulu","168":"Schedar","188":"Diphda","215":"Shimu","219":"Achird","264":"Tiansi","265":"Castula","271":"Kui","285":"Tarandus","335":"Junnanmen","337":"Mirach","338":"Wurren","361":"Revati","362":"Revati","390":"Adhil","403":"Ruchbah","424":"Polaris","437":"Alpherg","458":"Titawin","464":"Nembus","472":"Achernar","496":"Dajiangjunbei","510":"Torcular","539":"Baten Kaitos","542":"Segin","544":"Mothallah","545":"Mesarthim","546":"Mesarthim","553":"Sheratan","580":"Gang","592":"Rangifer","595":"Alrescha","596":"Alrescha","603":"Almach","604":"Almach","617":"Hamal","622":"Alaybasan","642":"Triminus","660":"Deltoton","664":"Apdu","681":"Mira","707":"Huagai","804":"Kaffaljidhma","824":"Lilii Borea","834":"Miram","838":"Bharani","850":"Angetenar","874":"Azha","897":"Acamar","898":"Acamar","911":"Menkar","932":"Shangcheng","936":"Algol","941":"Misam","951":"Botein","963":"Dalim","984":"Zibal","1017":"Mirfak","1084":"Ran","1122":"Sarvvis","1131":"Atik","1136":"Rana","1140":"Celaeno","1142":"Electra","1145":"Taygeta","1148":"Shaowei","1149":"Maia","1151":"Asterope","1155":"Custos","1156":"Merope","1165":"Alcyone","1178":"Atlas","1180":"Pleione","1220":"Áldu","1228":"Menkib","1231":"Zaurak","1239":"Bibing","1298":"Beid","1325":"Keid","1336":"Rhombus","1346":"Prima Hyadum","1373":"Secunda Hyadum","1393":"Beemim","1407":"Shakata","1409":"Ain","1412":"Chamukuy","1457":"Aldebaran","1464":"Theemin","1481":"Sceptrum","1497":"Gaja","1543":"Tabit","1547":"Lembu","1577":"Hassaleh","1605":"Almaaz","1612":"Saclateni","1636":"Mago","1641":"Haedus","1654":"Ping","1666":"Cursa","1702":"Bade","1708":"Capella","1713":"Rigel","1790":"Bellatrix","1791":"Elnath","1829":"Nihal","1852":"Mintaka","1865":"Arneb","1879":"Meissa","1880":"Meissa","1899":"Hatysa","1903":"Alnilam","1910":"Tianguan","1948":"Alnitak","1949":"Alnitak","1956":"Phact","1998":"Darlugal","2004":"Saiph","2040":"Wazn","2061":"Betelgeuse","2077":"Bagu","2088":"Menkalinan","2095":"Mahasim","2177":"Elkurud","2209":"Shangwei","2216":"Propus","2261":"Hoerikwaggo","2282":"Furud","2286":"Tejat","2294":"Mirzam","2326":"Canopus","2363":"Kamelos","2421":"Alhena","2451":"Pipit","2473":"Mebsuta","2484":"Alzirr","2491":"Sirius","2527":"Tonglingxing","2618":"Adhara","2622":"Citalá","2646":"Nganurganity","2650":"Mekbuda","2657":"Muliphein","2693":"Wezen","2777":"Wasat","2827":"Aludra","2845":"Gomeisa","2890":"Castor","2891":"Castor","2930":"Jishui","2943":"Procyon","2990":"Pollux","3045":"Azmidi","3165":"Naos","3185":"Tureis","3208":"Tegmine","3209":"Tegmine","3210":"Tegmine","3249":"Tarf","3268":"Piautos","3275":"Alsciaukat","3307":"Avior","3323":"Muscida","3418":"Minchir","3449":"Asellus Borealis","3461":"Asellus Australis","3475":"Yuyu","3482":"Ashlesha","3485":"Alsephina","3522":"Copernicus","3569":"Talitha","3572":"Acubens","3594":"Alkaphrah","3627":"Nahn","3634":"Suhail","3685":"Miaplacidus","3699":"Aspidiske","3734":"Markeb","3743":"Intercrus","3748":"Alphard","3773":"Alterf","3845":"Ukdah","3852":"Subra","3903":"Zhang","3905":"Rasalas","3923":"Felis","3980":"Yunü","3982":"Regulus","4031":"Adhafera","4033":"Tania Borealis","4057":"Algieba","4058":"Algieba","4069":"Tania Australis","4133":"Shaomin","4247":"Praecipua","4277":"Chalawan","4287":"Alkes","4295":"Merak","4301":"Dubhe","4357":"Zosma","4359":"Chertan","4374":"Alula Australis","4375":"Alula Australis","4377":"Alula Borealis","4434":"Giausar","4459":"Formosa","4518":"Taiyangshou","4534":"Denebola","4540":"Zavijava","4554":"Phecda","4609":"Tonatiuh","4623":"Alchiba","4656":"Imai","4660":"Megrez","4662":"Gienah","4689":"Zaniah","4700":"Ginan","4729":"Acrux","4730":"Acrux","4731":"Acrux","4757":"Algorab","4763":"Gacrux","4785":"Chara","4786":"Kraz","4789":"Phyllon Kissinou","4823":"Lumbung","4825":"Porrima","4826":"Porrima","4846":"La Superba","4853":"Mimosa","4863":"Tianyi","4905":"Alioth","4910":"Minelauva","4914":"Cor Caroli","4915":"Cor Caroli","4916":"Taiyi","4932":"Vindemiatrix","4968":"Diadem","4969":"Diadem","5020":"Naga","5028":"Kulou","5054":"Mizar","5055":"Mizar","5056":"Spica","5062":"Alcor","5095":"Apamvatsa","5107":"Heze","5185":"Tepiamenit","5190":"Heng","5191":"Alkaid","5231":"Leepwal","5235":"Muphrid","5267":"Hadar","5288":"Menkent","5291":"Thuban","5315":"Kang","5338":"Syrma","5340":"Arcturus","5351":"Xuange","5359":"Khambalia","5409":"Elgafar","5429":"Kalasungsang","5435":"Seginus","5447":"Genghe","5459":"Toliman","5460":"Toliman","5463":"Xami","5469":"Uridim","5470":"Paradys","5490":"Alrumh","5505":"Pulcherrima","5506":"Izar","5511":"Maenalus","5526":"Solitaire","5531":"Zubenelgenubi","5533":"Merga","5563":"Kochab","5602":"Nekkar","5603":"Brachium","5618":"Quadrans","5681":"Qigong","5685":"Zubeneschamali","5714":"Pherkad Minor","5733":"Alkalurops","5734":"Alkalurops","5735":"Pherkad","5744":"Edasich","5747":"Nusakan","5778":"Guansuo","5787":"Zubenelhakrabi","5793":"Alphecca","5849":"Baltesha","5854":"Unukalhai","5855":"Stephanos","5867":"Zhou","5879":"Gudja","5889":"Matrichakra","5928":"Iklil","5944":"Fang","5953":"Dschubba","5958":"Blaze Star","5971":"Aurwandilsta","5984":"Acrab","5985":"Acrab","6008":"Marsic","6009":"Marsic","6026":"Jabbah","6027":"Jabbah","6056":"Yed Prior","6075":"Yed Posterior","6084":"Alniyat","6092":"Asuusiha","6115":"Yaqana","6117":"Cujam","6132":"Athebyne","6134":"Antares","6148":"Kornephoros","6149":"Marfik","6165":"Paikauhale","6212":"Tianji","6217":"Atria","6241":"Larawag","6247":"Xamidimura","6252":"Pipirima","6298":"Shengong","6324":"Khepdenreret","6369":"Alrakis","6370":"Alrakis","6378":"Sabik","6396":"Aldhibah","6401":"Guniibuu","6402":"Guniibuu","6406":"Rasalgethi","6407":"Rasalgethi","6410":"Sarin","6418":"Nüchuang","6508":"Lesath","6526":"Maasym","6527":"Shaula","6536":"Rastaban","6553":"Sargas","6556":"Rasalhague","6585":"Cervantes","6588":"Tianbang","6603":"Cebalrai","6629":"Bake-eo","6630":"Fuyue","6636":"Dziban","6637":"Dziban","6688":"Grumium","6705":"Eltanin","6729":"Bodu","6730":"Bodu","6746":"Alnasl","6787":"Ramus","6789":"Yildun","6812":"Polis","6859":"Kaus Media","6879":"Kaus Australis","6895":"Tusizuo","6913":"Kaus Borealis","6945":"Fafnir","6973":"Tianbian","7001":"Vega","7043":"Xihe","7051":"Pongaponga","7052":"Pongaponga","7056":"Kautoki","7057":"Urquchillay","7106":"Sheliak","7116":"Ainalrami","7121":"Nunki","7139":"Jiantai","7141":"Alya","7142":"Alya","7157":"Niandao","7176":"Arin-majlep","7178":"Sulafat","7194":"Ascella","7228":"Polaris Australis","7235":"Okab","7254":"Meridiana","7264":"Albaldah","7291":"Gumala","7298":"Aladfar","7310":"Altais","7314":"Ninnisig","7337":"Arkab Prior","7343":"Arkab Posterior","7348":"Rukbat","7377":"Guqi","7405":"Anser","7417":"Albireo","7418":"Albireo","7462":"Alsafi","7474":"Hru","7479":"Sham","7488":"Shakh","7525":"Tarazed","7528":"Fawaris","7536":"Zuoqi","7557":"Altair","7570":"Pagru","7595":"Libertas","7597":"Terebellum","7602":"Alshain","7635":"Telum","7669":"Tianfu","7710":"Antinous","7754":"Algedi","7773":"Alshat","7776":"Dabih","7790":"Peacock","7796":"Sadr","7852":"Aldulfin","7882":"Rotanev","7906":"Sualocin","7924":"Deneb","7949":"Aljanah","7950":"Albali","8030":"Musica","8075":"Udang","8131":"Kitalpha","8162":"Alderamin","8232":"Sadalsuud","8238":"Alfirk","8264":"Bunda","8278":"Nashira","8301":"Azelfafage","8308":"Enif","8316":"Garnet Star","8322":"Deneb Algedi","8353":"Aldhanab","8414":"Sadalmelik","8417":"Kurhah","8425":"Alnair","8450":"Biham","8499":"Ancha","8502":"Lang-exster","8518":"Sadachbia","8585":"Stellio","8610":"Situla","8634":"Homam","8636":"Tiaki","8650":"Matar","8684":"Sadalbari","8698":"Shatabhisha","8709":"Skat","8726":"Tengshe","8728":"Fomalhaut","8729":"Helvetios","8762":"Alfarasalkamil","8773":"Fumalsamakah","8775":"Scheat","8781":"Markab","8812":"Safina","8830":"Honores","8880":"Salm","8905":"Alkarab","8930":"Veritate","8961":"Udkadua","8965":"Rasalnaqa","8974":"Errai","8976":"Kaffalmusalsala","9098":"Hydor"};

const CONSTELLATION_NAMES = {"And":"Andromeda","Ant":"Antlia","Aps":"Apus","Aqr":"Aquarius","Aql":"Aquila","Ara":"Ara","Ari":"Aries","Aur":"Auriga","Boo":"Boötes","Cae":"Caelum","Cam":"Camelopardus","Cap":"Capricornus","Car":"Carina","Cas":"Cassiopeia","Cen":"Centaurus","Cep":"Cepheus","Cet":"Cetus","Cha":"Chamaeleon","Cir":"Circinus","CMa":"Canis Major","CMi":"Canis Minor","Cnc":"Cancer","Col":"Columba","Com":"Coma Berenices","CrA":"Corona Australis","CrB":"Corona Borealis","Crt":"Crater","Cru":"Crux","Crv":"Corvus","CVn":"Canes Venatici","Cyg":"Cygnus","Del":"Delphinus","Dor":"Dorado","Dra":"Draco","Equ":"Equuleus","Eri":"Eridanus","For":"Fornax","Gem":"Gemini","Gru":"Grus","Her":"Hercules","Hor":"Horologium","Hya":"Hydra","Hyi":"Hydrus","Ind":"Indus","Lac":"Lacerta","Leo":"Leo","Lep":"Lepus","Lib":"Libra","LMi":"Leo Minor","Lup":"Lupus","Lyn":"Lynx","Lyr":"Lyra","Men":"Mensa","Mic":"Microscopium","Mon":"Monoceros","Mus":"Musca","Nor":"Norma","Oct":"Octans","Oph":"Ophiuchus","Ori":"Orion","Pav":"Pavo","Peg":"Pegasus","Per":"Perseus","Phe":"Phoenix","Pic":"Pictor","PsA":"Piscis Austrinus","Psc":"Pices","Pup":"Puppis","Pyx":"Pyxis","Ret":"Reticulum","Sco":"Scorpius","Scl":"Sculptor","Sct":"Scutum","Ser":"Serpens*","Sex":"Sextans","Sge":"Sagitta","Sgr":"Sagittarius","Tau":"Taurus","Tel":"Telescopium","TrA":"Triangulum Australe","Tri":"Triangulum","Tuc":"Tucana","UMa":"Ursa Major","UMi":"Ursa Minor","Vel":"Vela","Vir":"Virgo","Vol":"Volans","Vul":"Vulpecula"};

function hmsToDeg(s) {
  const m = s.match(/(\d+)h\s*(\d+)m\s*([\d.]+)s/);
  if (!m) return null;
  return (parseFloat(m[1]) + parseFloat(m[2]) / 60 + parseFloat(m[3]) / 3600) * 15;
}

function dmsToDeg(s) {
  const m = s.match(/([+-]?)(\d+)[\u00b0\u2032\s]+(\d+)[\u2032\u2033\s]+([\d.]+)[\u2033]?/);
  if (!m) return null;
  return (m[1] === '-' ? -1 : 1) * (parseFloat(m[2]) + parseFloat(m[3]) / 60 + parseFloat(m[4]) / 3600);
}

async function loadCatalogData() {
  const [bsc, bscShort] = await Promise.all([
    fetch(BSC5_BASE + 'bsc5.json').then(r => {
      if (!r.ok) throw new Error('bsc5.json HTTP ' + r.status);
      return r.json();
    }),
    fetch(BSC5_BASE + 'bsc5-short.json').then(r => {
      if (!r.ok) throw new Error('bsc5-short.json HTTP ' + r.status);
      return r.json();
    })
  ]);

  const hrConst = {};
  bscShort.forEach(s => {
    if (s.HR && s.C) hrConst[parseInt(s.HR, 10)] = s.C;
  });

  const catalog = [];
  bsc.forEach(s => {
    const ra = hmsToDeg(s.RA || '');
    const dec = dmsToDeg(s.Dec || '');
    const mag = parseFloat(s.Vmag);
    if (ra === null || dec === null || isNaN(mag) || mag > 6.5) return;
    const bv = parseFloat(s['B-V']);
    const hr = parseInt(s.HR, 10) || 0;
    catalog.push([
      Math.round(ra * 1000) / 1000,
      Math.round(dec * 1000) / 1000,
      mag,
      isNaN(bv) ? 0.6 : bv,
      parseFloat(s.pmRA) || 0,
      parseFloat(s.pmDE) || 0,
      hr,
      (s.SpectralCls || '').trim(),
      hrConst[hr] || ''
    ]);
  });
  return catalog;
}

async function init() {
  let catalog;
  try {
    catalog = await loadCatalogData();
  } catch (err) {
    const readout = document.getElementById('yearReadout');
    if (readout) readout.textContent = 'Star catalog failed to load — check your connection and refresh.';
    return;
  }
  buildCatalog(catalog, IAU_STAR_NAMES, CONSTELLATION_NAMES);

  const mapNorth = new HemisphereMap(document.getElementById('starCanvasNorth'), 'north');
  const mapSouth = new HemisphereMap(document.getElementById('starCanvasSouth'), 'south');
  const maps = [mapNorth, mapSouth];

  let currentYear = 2026;

  function setYear(year) {
    currentYear = clampYear(year);

    maps.forEach(m => m.setYear(currentYear));

    document.getElementById('yearReadout').textContent = formatYear(currentYear);
    document.getElementById('epochLabelNorth').textContent = `Epoch: ${formatYear(currentYear)}`;
    document.getElementById('epochLabelSouth').textContent = `Epoch: ${formatYear(currentYear)}`;

    document.getElementById('timelineSlider').value = currentYear;
    document.getElementById('yearInput').value = currentYear;

    const infoN = getPoleStarInfo(currentYear, 'north');
    document.getElementById('poleStarNameNorth').textContent   = infoN.name;
    document.getElementById('poleStarDetailNorth').textContent = infoN.detail;

    const infoS = getPoleStarInfo(currentYear, 'south');
    document.getElementById('poleStarNameSouth').textContent   = infoS.name;
    document.getElementById('poleStarDetailSouth').textContent = infoS.detail;

    document.querySelectorAll('.preset-btn').forEach(btn => {
      const y = parseInt(btn.dataset.year, 10);
      btn.classList.toggle('active', y === currentYear);
    });
  }

  const slider = document.getElementById('timelineSlider');
  slider.addEventListener('input', () => {
    setYear(parseInt(slider.value, 10));
  });

  const yearInput = document.getElementById('yearInput');
  const goBtn     = document.getElementById('yearGoBtn');

  function applyManualInput() {
    const val = parseInt(yearInput.value, 10);
    if (!isNaN(val)) {
      setYear(val);
    }
  }

  goBtn.addEventListener('click', applyManualInput);
  yearInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') applyManualInput();
  });

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setYear(parseInt(btn.dataset.year, 10));
    });
  });

  maps.forEach(m => {
    m.onStarClick = (star) => {
      openStarCard(star, currentYear);
    };
  });

  document.getElementById('cardCloseBtn').addEventListener('click', closeStarCard);
  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeStarCard();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeStarCard();
  });

  setYear(2026);
}

document.addEventListener('DOMContentLoaded', init);
