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

// ─────────────────────────────────────────────
//  1. STAR DATABASE
//  All angular coordinates are J2000.0 epoch
//  RA in decimal degrees, Dec in decimal degrees
// ─────────────────────────────────────────────
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
  }
];

// ─────────────────────────────────────────────
//  2. PRECESSION ENGINE
//  Earth's rotational axis traces a cone with a
//  period of ~25,772 years (one Platonic Year).
//  The north celestial pole moves in a circle of
//  radius ~23.44° centred on the ecliptic pole.
// ─────────────────────────────────────────────
const PRECESSION = {
  PERIOD: 25772,           // years
  OBLIQUITY: 23.4392911,  // degrees — axial tilt (approx constant for our purposes)
  // Ecliptic pole in RA/Dec (J2000): RA=270°, Dec=+66.56°
  ECLIPTIC_POLE_RA:  270.0,
  ECLIPTIC_POLE_DEC:  66.5607,
  // Reference epoch: J2000.0 = year 2000
  REF_YEAR: 2000
};

/**
 * Convert degrees to radians.
 */
function toRad(deg) { return deg * Math.PI / 180; }

/**
 * Convert radians to degrees.
 */
function toDeg(rad) { return rad * 180 / Math.PI; }

/**
 * Convert equatorial coordinates (RA, Dec) to Cartesian unit vector.
 */
function equatorialToCartesian(raDeg, decDeg) {
  const ra  = toRad(raDeg);
  const dec = toRad(decDeg);
  return {
    x: Math.cos(dec) * Math.cos(ra),
    y: Math.cos(dec) * Math.sin(ra),
    z: Math.sin(dec)
  };
}

/**
 * Convert Cartesian unit vector back to equatorial RA/Dec.
 */
function cartesianToEquatorial(v) {
  const dec = toDeg(Math.asin(Math.clamp ? Math.clamp(v.z, -1, 1) : Math.max(-1, Math.min(1, v.z))));
  let ra = toDeg(Math.atan2(v.y, v.x));
  if (ra < 0) ra += 360;
  return { ra, dec };
}

/**
 * Rotate vector v around axis k by angle theta (Rodrigues' formula).
 * k must be a unit vector.
 */
function rotateAroundAxis(v, k, thetaRad) {
  const cosT = Math.cos(thetaRad);
  const sinT = Math.sin(thetaRad);
  const dot  = v.x * k.x + v.y * k.y + v.z * k.z;
  // cross product k × v
  const cx = k.y * v.z - k.z * v.y;
  const cy = k.z * v.x - k.x * v.z;
  const cz = k.x * v.y - k.y * v.x;
  return {
    x: v.x * cosT + cx * sinT + k.x * dot * (1 - cosT),
    y: v.y * cosT + cy * sinT + k.y * dot * (1 - cosT),
    z: v.z * cosT + cz * sinT + k.z * dot * (1 - cosT)
  };
}

/**
 * Compute the precession angle for a given year relative to J2000.
 * Returns the angle in radians that the equatorial frame has rotated.
 */
function precessionAngle(year) {
  const deltaYears = year - PRECESSION.REF_YEAR;
  // Full circle in PERIOD years — retrograde (westward), so negative direction
  return -2 * Math.PI * deltaYears / PRECESSION.PERIOD;
}

/**
 * Apply axial precession to a star's J2000 RA/Dec to get its apparent
 * position for a given year.
 *
 * The precession rotates the entire celestial sphere around the ecliptic
 * pole by the precession angle.
 */
function applyPrecession(raDeg, decDeg, year) {
  // 1. Convert star's J2000 coords to Cartesian
  const starVec = equatorialToCartesian(raDeg, decDeg);

  // 2. Get ecliptic pole unit vector (this is the rotation axis)
  const eclVec = equatorialToCartesian(PRECESSION.ECLIPTIC_POLE_RA, PRECESSION.ECLIPTIC_POLE_DEC);

  // 3. Compute precession angle for this year
  const angle = precessionAngle(year);

  // 4. Rotate the star vector around the ecliptic pole
  const rotated = rotateAroundAxis(starVec, eclVec, angle);

  // 5. Convert back to RA/Dec
  return cartesianToEquatorial(rotated);
}

/**
 * Get the current north celestial pole position for a given year.
 * In J2000 the NCP is at RA=0°, Dec=90°.
 * With precession, it moves around the ecliptic pole in a circle of
 * radius ~23.44°.
 */
function getPolePosition(year) {
  return applyPrecession(0, 90, year);
}

/**
 * Determine the nearest bright named pole-star candidate for a given year,
 * and return a human-readable description.
 */
function getPoleStarInfo(year) {
  const pole = getPolePosition(year);

  let nearest = null;
  let nearestDist = Infinity;

  STARS.forEach(star => {
    const precessed = applyPrecession(star.ra, star.dec, year);
    const dist = angularDistance(precessed.ra, precessed.dec, pole.ra, pole.dec);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = { star, dist };
    }
  });

  if (nearest && nearest.dist < 12) {
    const deg = nearest.dist.toFixed(1);
    return {
      name: nearest.star.name,
      detail: `${nearest.star.bayer} · ~${deg}° from pole`
    };
  }

  // If none of our named stars are close, describe by RA/Dec
  return {
    name: 'No bright pole star',
    detail: `Pole at RA ${pole.ra.toFixed(0)}° / Dec ${pole.dec.toFixed(1)}°`
  };
}

/**
 * Angular distance between two RA/Dec points (in degrees).
 */
function angularDistance(ra1, dec1, ra2, dec2) {
  const r1 = toRad(ra1); const d1 = toRad(dec1);
  const r2 = toRad(ra2); const d2 = toRad(dec2);
  const cosAngle =
    Math.sin(d1) * Math.sin(d2) +
    Math.cos(d1) * Math.cos(d2) * Math.cos(r1 - r2);
  return toDeg(Math.acos(Math.max(-1, Math.min(1, cosAngle))));
}

// ─────────────────────────────────────────────
//  3. CANVAS STAR MAP RENDERER
// ─────────────────────────────────────────────

class StarMap {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx    = canvasEl.getContext('2d');
    this.year   = 2026;
    this.bgStars = [];
    this.hoveredStar = null;
    this.onStarClick = null;

    this._generateBgStars();
    this._bindEvents();
    this.resize();
  }

  // Generate a stable field of faint background stars
  _generateBgStars() {
    // Use a seeded pseudo-random for reproducibility
    const N = 380;
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF;
      return (seed >>> 0) / 0xFFFFFFFF;
    };

    this.bgStars = [];
    for (let i = 0; i < N; i++) {
      this.bgStars.push({
        // Normalised position [0,1]
        nx: rand(),
        ny: rand(),
        r:  0.4 + rand() * 1.1,
        a:  0.05 + rand() * 0.45,
        // Slight blue-white tint variety
        hue: rand() < 0.7 ? 210 : (rand() < 0.5 ? 40 : 0),
        sat: rand() < 0.7 ? 40 : 0
      });
    }
  }

  _bindEvents() {
    this.canvas.addEventListener('mousemove', this._onMouseMove.bind(this));
    this.canvas.addEventListener('click',     this._onClick.bind(this));
    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredStar = null;
      this.canvas.style.cursor = 'crosshair';
      this._scheduleRedraw();
    });
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    const container = this.canvas.parentElement;
    const size = Math.min(
      container.offsetWidth  - 2,
      window.innerHeight * 0.82
    );
    const sz = Math.max(360, Math.floor(size));
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

  // ── Projection ───────────────────────────────
  // We use an orthographic-like polar projection centred on the
  // current celestial north pole, scaled so Dec = 0° appears
  // at the canvas edge.  Only the northern hemisphere is shown
  // (Dec > −30°) to keep the view coherent.

  _project(raDeg, decDeg) {
    const pole = getPolePosition(this.year);
    const dist  = angularDistance(raDeg, decDeg, pole.ra, pole.dec);
    // Angular distance from pole → radial distance on canvas
    const maxDeg = 115; // degrees of sky shown from pole to edge
    const r = (dist / maxDeg) * (this.size * 0.5 - 8);

    // Compute position angle (bearing from pole to star)
    const poleRad  = { ra: toRad(pole.ra),  dec: toRad(pole.dec) };
    const starRad  = { ra: toRad(raDeg),     dec: toRad(decDeg) };

    const dRA  = starRad.ra - poleRad.ra;
    const y_   = Math.sin(dRA) * Math.cos(starRad.dec);
    const x_   = Math.cos(poleRad.dec) * Math.sin(starRad.dec)
                 - Math.sin(poleRad.dec) * Math.cos(starRad.dec) * Math.cos(dRA);
    const pa   = Math.atan2(y_, x_);   // position angle

    const cx = this.size * 0.5;
    const cy = this.size * 0.5;

    return {
      x: cx + r * Math.sin(pa),
      y: cy - r * Math.cos(pa),
      dist,
      r
    };
  }

  // ── Main Draw ────────────────────────────────
  draw() {
    const ctx  = this.ctx;
    const sz   = this.size;
    const cx   = sz * 0.5;
    const cy   = sz * 0.5;

    ctx.clearRect(0, 0, sz, sz);

    // --- Background gradient (deep space) ---
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sz * 0.5);
    bgGrad.addColorStop(0,   '#0c1128');
    bgGrad.addColorStop(0.6, '#060810');
    bgGrad.addColorStop(1,   '#030408');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.5 - 1, 0, Math.PI * 2);
    ctx.fill();

    // Clip to circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.5 - 1, 0, Math.PI * 2);
    ctx.clip();

    // --- Faint circular grid lines ---
    ctx.strokeStyle = 'rgba(180, 150, 70, 0.07)';
    ctx.lineWidth = 1;
    [30, 60, 90].forEach(deg => {
      const maxDeg = 115;
      const r = (deg / maxDeg) * (sz * 0.5 - 8);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // --- Background stars ---
    this.bgStars.forEach(s => {
      const px = s.nx * sz;
      const py = s.ny * sz;
      const grd = ctx.createRadialGradient(px, py, 0, px, py, s.r * 2);
      grd.addColorStop(0,   `hsla(${s.hue}, ${s.sat}%, 100%, ${s.a})`);
      grd.addColorStop(1,   `hsla(${s.hue}, ${s.sat}%, 100%, 0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(px, py, s.r * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // --- Precession circle (path of celestial pole over one full cycle) ---
    this._drawPrecessionCircle(ctx, cx, cy, sz);

    // --- Celestial pole marker ---
    this._drawPoleMarker(ctx, cx, cy);

    // --- Named stars ---
    this._namedStarPositions = [];
    STARS.forEach(star => {
      const precessed = applyPrecession(star.ra, star.dec, this.year);
      const proj      = this._project(precessed.ra, precessed.dec);
      const isHovered = this.hoveredStar && this.hoveredStar.id === star.id;
      this._drawNamedStar(ctx, star, proj, isHovered);
      this._namedStarPositions.push({ star, proj, precessed });
    });

    ctx.restore();

    // --- Circle border ---
    ctx.strokeStyle = 'rgba(160, 140, 80, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.5 - 1, 0, Math.PI * 2);
    ctx.stroke();
  }

  _drawPrecessionCircle(ctx, cx, cy, sz) {
    // Draw the small circle traced by the north celestial pole
    // over one full precessional cycle.
    // The pole sweeps a cone of radius ≈ 23.44° around the ecliptic pole.

    const steps = 360;
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const year = PRECESSION.REF_YEAR + (i / steps) * PRECESSION.PERIOD;
      const polePos = getPolePosition(year);
      // Project the pole against the *current* view pole (which is today's pole for the reference frame)
      const viewPole  = getPolePosition(this.year);
      const dist      = angularDistance(polePos.ra, polePos.dec, viewPole.ra, viewPole.dec);
      const maxDeg    = 115;
      const r         = (dist / maxDeg) * (sz * 0.5 - 8);

      const dRA = toRad(polePos.ra - viewPole.ra);
      const y_  = Math.sin(dRA) * Math.cos(toRad(polePos.dec));
      const x_  = Math.cos(toRad(viewPole.dec)) * Math.sin(toRad(polePos.dec))
                  - Math.sin(toRad(viewPole.dec)) * Math.cos(toRad(polePos.dec)) * Math.cos(dRA);
      const pa  = Math.atan2(y_, x_);
      points.push({
        x: cx + r * Math.sin(pa),
        y: cy - r * Math.cos(pa)
      });
    }

    // Dashed gold circle
    ctx.save();
    ctx.setLineDash([4, 8]);
    ctx.strokeStyle = 'rgba(180, 140, 50, 0.28)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.restore();
  }

  _drawPoleMarker(ctx, cx, cy) {
    // The current pole is always at the canvas center
    const r = 5;
    // Outer ring
    ctx.strokeStyle = 'rgba(96, 200, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
    ctx.stroke();

    // Inner dot
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0, 'rgba(140, 220, 255, 1)');
    grd.addColorStop(1, 'rgba(60, 180, 255, 0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Cross-hair lines
    ctx.strokeStyle = 'rgba(96, 200, 255, 0.4)';
    ctx.lineWidth = 0.75;
    const len = 12;
    ctx.beginPath();
    ctx.moveTo(cx - len, cy); ctx.lineTo(cx + len, cy);
    ctx.moveTo(cx, cy - len); ctx.lineTo(cx, cy + len);
    ctx.stroke();
  }

  _drawNamedStar(ctx, star, proj, isHovered) {
    const { x, y } = proj;

    // Skip if very close to edge
    if (x < 4 || x > this.size - 4 || y < 4 || y > this.size - 4) return;

    const baseSize = star.size || 3;
    const size     = isHovered ? baseSize + 2 : baseSize;

    // Outer glow
    const glowR = isHovered ? size * 5 : size * 3.5;
    const glow  = ctx.createRadialGradient(x, y, 0, x, y, glowR);
    glow.addColorStop(0, star.color + 'cc');
    glow.addColorStop(1, star.color + '00');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Star core
    const starGrd = ctx.createRadialGradient(x, y, 0, x, y, size);
    starGrd.addColorStop(0, '#ffffff');
    starGrd.addColorStop(0.4, star.color);
    starGrd.addColorStop(1, star.color + '88');
    ctx.fillStyle = starGrd;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Hover ring
    if (isHovered) {
      ctx.strokeStyle = star.color;
      ctx.lineWidth   = 1;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(x, y, size + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Label
    const labelOpacity = isHovered ? 1.0 : 0.65;
    ctx.globalAlpha = labelOpacity;
    ctx.fillStyle   = star.color;
    ctx.font        = `${isHovered ? 600 : 400} ${isHovered ? 12 : 11}px 'Cinzel', serif`;
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur  = 4;
    ctx.fillText(star.name, x + size + 5, y + 4);
    ctx.shadowBlur  = 0;
    ctx.globalAlpha = 1;
  }

  // ── Mouse Interaction ────────────────────────
  _getCanvasPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  _findHoveredStar(mx, my) {
    if (!this._namedStarPositions) return null;
    const hitRadius = 18;
    let found = null;
    let minDist = Infinity;
    this._namedStarPositions.forEach(({ star, proj }) => {
      const dx   = proj.x - mx;
      const dy   = proj.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < hitRadius && dist < minDist) {
        minDist = dist;
        found   = star;
      }
    });
    return found;
  }

  _onMouseMove(e) {
    const { x, y } = this._getCanvasPos(e);
    const star = this._findHoveredStar(x, y);
    if (star !== this.hoveredStar) {
      this.hoveredStar = star;
      this.canvas.style.cursor = star ? 'pointer' : 'crosshair';
      this._scheduleRedraw();
    }
  }

  _onClick(e) {
    const { x, y } = this._getCanvasPos(e);
    const star = this._findHoveredStar(x, y);
    if (star && this.onStarClick) {
      this.onStarClick(star);
    }
  }
}

// ─────────────────────────────────────────────
//  4. YEAR FORMATTING HELPERS
// ─────────────────────────────────────────────

function formatYear(year) {
  const y = Math.round(year);
  if (y >= 0) return `${y} CE`;
  return `${Math.abs(y)} BCE`;
}

function clampYear(y) {
  return Math.max(-10000, Math.min(2026, Math.round(y)));
}

// ─────────────────────────────────────────────
//  5. STAR CARD UI
// ─────────────────────────────────────────────

function openStarCard(star, year) {
  document.getElementById('cardStarName').textContent     = star.name;
  document.getElementById('cardConstellation').textContent = star.constellation;
  document.getElementById('cardBayer').textContent         = star.bayer;
  document.getElementById('cardDistance').textContent      = star.distance.toLocaleString();
  document.getElementById('cardMass').textContent          = star.mass.toFixed(2);
  document.getElementById('cardRadius').textContent        = star.radius >= 10
    ? star.radius.toLocaleString()
    : star.radius.toFixed(2);
  document.getElementById('cardLuminosity').textContent    = star.luminosity >= 1000
    ? star.luminosity.toLocaleString()
    : star.luminosity.toFixed(1);
  document.getElementById('cardSpectral').textContent      = star.spectral;
  document.getElementById('cardMagnitude').textContent     = star.magnitude.toFixed(2);
  document.getElementById('cardLore').textContent          = star.lore;

  // Glyph color matches star color
  const glyph = document.getElementById('cardGlyph');
  glyph.style.color = star.color;
  glyph.style.textShadow = `0 0 20px ${star.color}99, 0 0 40px ${star.color}44`;

  // Precession note — is this star near the pole for this year?
  const pole    = getPolePosition(year);
  const precPos = applyPrecession(star.ra, star.dec, year);
  const dist    = angularDistance(precPos.ra, precPos.dec, pole.ra, pole.dec);
  const noteEl  = document.getElementById('cardPrecessionNote');
  const noteText = document.getElementById('cardPrecessionText');

  if (dist < 8) {
    let msg;
    if (dist < 2) {
      msg = `${star.name} is the current pole star for ${formatYear(year)}, sitting only ${dist.toFixed(1)}° from the celestial north pole.`;
    } else {
      msg = `${star.name} is close to the celestial north pole for ${formatYear(year)} — just ${dist.toFixed(1)}° away.`;
    }
    noteText.textContent = msg;
    noteEl.style.display = 'flex';
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

// ─────────────────────────────────────────────
//  6. APP INITIALISATION
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const canvas  = document.getElementById('starCanvas');
  const map     = new StarMap(canvas);

  let currentYear = 2026;

  // --- Update all UI from year ---
  function setYear(year) {
    currentYear = clampYear(year);

    // Update map
    map.setYear(currentYear);

    // Update year readout
    document.getElementById('yearReadout').textContent = formatYear(currentYear);

    // Update epoch label on canvas
    document.getElementById('epochLabel').textContent = `Epoch: ${formatYear(currentYear)}`;

    // Sync slider
    document.getElementById('timelineSlider').value = currentYear;

    // Sync text input
    document.getElementById('yearInput').value = currentYear;

    // Update pole star info
    const info = getPoleStarInfo(currentYear);
    document.getElementById('poleStarName').textContent   = info.name;
    document.getElementById('poleStarDetail').textContent = info.detail;

    // Highlight active preset (if any)
    document.querySelectorAll('.preset-btn').forEach(btn => {
      const y = parseInt(btn.dataset.year, 10);
      btn.classList.toggle('active', y === currentYear);
    });
  }

  // --- Slider ---
  const slider = document.getElementById('timelineSlider');
  slider.addEventListener('input', () => {
    setYear(parseInt(slider.value, 10));
  });

  // --- Manual input + Go button ---
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

  // --- Preset buttons ---
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setYear(parseInt(btn.dataset.year, 10));
    });
  });

  // --- Star click → modal ---
  map.onStarClick = (star) => {
    openStarCard(star, currentYear);
  };

  // --- Modal close ---
  document.getElementById('cardCloseBtn').addEventListener('click', closeStarCard);
  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeStarCard();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeStarCard();
  });

  // --- Initial render ---
  setYear(2026);
});
