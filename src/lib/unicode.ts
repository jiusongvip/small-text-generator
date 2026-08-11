export interface StyleOutput {
  label: string;
  slug: string;
  description: string;
  text: string;
}

const SC: Record<string, string> = {
  a: "\u1D00", b: "\u0299", c: "\u1D04", d: "\u1D05", e: "\u1D07",
  f: "\uA730", g: "\u0262", h: "\u029C", i: "\u026A", j: "\u1D0A",
  k: "\u1D0B", l: "\u029F", m: "\u1D0D", n: "\u0274", o: "\u1D0F",
  p: "\u1D18", q: "\u01EB", r: "\u0280", s: "\uA731", t: "\u1D1B",
  u: "\u1D1C", v: "\u1D20", w: "\u1D21", x: "\u00D7", y: "\u028F",
  z: "\u1D22",
};

const SL: Record<string, string> = {
  a: "\u1D43", b: "\u1D47", c: "\u1D9C", d: "\u1D48", e: "\u1D49",
  f: "\u1DA0", g: "\u1D4D", h: "\u02B0", i: "\u2071", j: "\u02B2",
  k: "\u1D4F", l: "\u02E1", m: "\u1D50", n: "\u207F", o: "\u1D52",
  p: "\u1D56", q: "\u146B", r: "\u02B3", s: "\u02E2", t: "\u1D57",
  u: "\u1D58", v: "\u1D5B", w: "\u02B7", x: "\u02E3", y: "\u02B8",
  z: "\u1DBB",
};

const SU: Record<string, string> = {
  A: "\u1D2C", B: "\u1D2E", C: "\u1D9C", D: "\u1D30", E: "\u1D31",
  F: "\u1DA0", G: "\u1D33", H: "\u1D34", I: "\u1D35", J: "\u1D36",
  K: "\u1D37", L: "\u1D38", M: "\u1D39", N: "\u1D3A", O: "\u1D3C",
  P: "\u1D3E", Q: "\u146B", R: "\u1D3F", S: "\u02E2", T: "\u1D40",
  U: "\u1D41", V: "\u1D5B", W: "\u1D42", X: "\u02E3", Y: "\u02B8",
  Z: "\u1DBB",
};

const SB: Record<string, string> = {
  a: "\u2090", e: "\u2091", h: "\u2095", i: "\u1D62",
  j: "\u2C7C", k: "\u2096", l: "\u2097", m: "\u2098",
  n: "\u2099", o: "\u2092", p: "\u209A", r: "\u1D63",
  s: "\u209B", t: "\u209C", u: "\u1D64", v: "\u1D65",
  x: "\u2093",
};

const SN: Record<string, string> = {
  "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3",
  "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077",
  "8": "\u2078", "9": "\u2079",
  "+": "\u207A", "-": "\u207B", "=": "\u207C",
  "(": "\u207D", ")": "\u207E",
};

const SBN: Record<string, string> = {
  "0": "\u2080", "1": "\u2081", "2": "\u2082", "3": "\u2083",
  "4": "\u2084", "5": "\u2085", "6": "\u2086", "7": "\u2087",
  "8": "\u2088", "9": "\u2089",
  "+": "\u208A", "-": "\u208B", "=": "\u208C",
  "(": "\u208D", ")": "\u208E",
};

// --- New fancy text styles ---

// Helper: generate consecutive Unicode codepoint range for letters
function genUpper(offset: number): Record<string, string> {
  const m: Record<string, string> = {};
  for (let i = 0; i < 26; i++) m[String.fromCharCode(65 + i)] = String.fromCodePoint(offset + i);
  return m;
}
function genLower(offset: number): Record<string, string> {
  const m: Record<string, string> = {};
  for (let i = 0; i < 26; i++) m[String.fromCharCode(97 + i)] = String.fromCodePoint(offset + i);
  return m;
}
function genDigits(offset: number): Record<string, string> {
  const m: Record<string, string> = {};
  for (let i = 0; i < 10; i++) m[String(i)] = String.fromCodePoint(offset + i);
  return m;
}

// Bubble Text (Circled Latin letters)
const BU: Record<string, string> = genUpper(0x24B6);
const BL: Record<string, string> = genLower(0x24D0);
const BUBBLE: Record<string, string> = {
  ...BU, ...BL,
  "0": "\u24EA", "1": "\u2460", "2": "\u2461", "3": "\u2462",
  "4": "\u2463", "5": "\u2464", "6": "\u2465", "7": "\u2466",
  "8": "\u2467", "9": "\u2468",
};

// Bold Text (Mathematical Bold)
const BOLD_UPPER: Record<string, string> = genUpper(0x1D400);
const BOLD_LOWER: Record<string, string> = genLower(0x1D41A);
const BOLD_DIGITS: Record<string, string> = genDigits(0x1D7CE);
const BOLD: Record<string, string> = { ...BOLD_UPPER, ...BOLD_LOWER, ...BOLD_DIGITS };

// Italic Text (Mathematical Italic)
const ITAL_UPPER: Record<string, string> = genUpper(0x1D434);
const ITAL_LOWER: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    if (i === 7) { m["h"] = "\u210E"; continue; } // Planck constant looks like italic h
    m[String.fromCharCode(97 + i)] = String.fromCodePoint(0x1D44E + i);
  }
  return m;
})();
const ITALIC: Record<string, string> = { ...ITAL_UPPER, ...ITAL_LOWER };

// Bold Italic Text (Mathematical Bold Italic)
const BI_UPPER: Record<string, string> = genUpper(0x1D468);
const BI_LOWER: Record<string, string> = genLower(0x1D482);
const BI_DIGITS: Record<string, string> = genDigits(0x1D7CE);
const BOLD_ITALIC: Record<string, string> = { ...BI_UPPER, ...BI_LOWER, ...BI_DIGITS };

// Italic doesn't have dedicated math digits in Unicode; reuse superscript digits for combined output
const ITALIC_FULL: Record<string, string> = { ...ITAL_UPPER, ...ITAL_LOWER, ...SN };

// Merged maps: letters + digits combined for one-pass conversion
const SL_N: Record<string, string> = { ...SL, ...SN };   // Superscript letters + digits
const SB_N: Record<string, string> = { ...SB, ...SBN };   // Subscript letters + digits
const SC_N: Record<string, string> = { ...SC, ...SN };    // Small Caps + superscript digits

function mapStr(t: string, m: Record<string, string>): string {
  let r = "";
  for (const c of t) r += m[c] ?? c;
  return r;
}

function emptyStyles(): StyleOutput[] {
  return [
    { label: "Small Caps", slug: "small-caps", description: "Petite capitals + tiny digits. Great for emphasis.", text: "" },
    { label: "Superscript", slug: "superscript", description: "Tiny raised letters & digits. Best for bios.", text: "" },
    { label: "Subscript", slug: "subscript", description: "Tiny lowered letters & digits. Subtle unique look.", text: "" },
    { label: "Numbers (sup)", slug: "numbers", description: "Digits and math in superscript format.", text: "" },
    { label: "Numbers (sub)", slug: "numbers-sub", description: "Digits and equations in subscript format.", text: "" },
    { label: "Bubble Text", slug: "bubble", description: "Circled letters. Eye-catching for social bios.", text: "" },
    { label: "Bold", slug: "bold", description: "Mathematical bold. Strong readable emphasis.", text: "" },
    { label: "Italic", slug: "italic", description: "Mathematical italic. Elegant flowing style.", text: "" },
    { label: "Bold Italic", slug: "bold-italic", description: "Bold + italic combined. Maximum impact.", text: "" },
  ];
}

export function convertAll(text: string): StyleOutput[] {
  if (!text.trim()) return emptyStyles();
  const lo = text.toLowerCase();
  return [
    { label: "Small Caps", slug: "small-caps", description: "Petite capitals + tiny digits. Great for emphasis.", text: mapStr(lo, SC_N) },
    { label: "Superscript", slug: "superscript", description: "Tiny raised letters & digits. Best for bios.", text: mapStr(lo, SL_N) },
    { label: "Subscript", slug: "subscript", description: "Tiny lowered letters & digits. Subtle unique look.", text: mapStr(lo, SB_N) },
    { label: "Numbers (sup)", slug: "numbers", description: "Digits and math in superscript format.", text: mapStr(text, SN) },
    { label: "Numbers (sub)", slug: "numbers-sub", description: "Digits and equations in subscript format.", text: mapStr(text, SBN) },
    { label: "Bubble Text", slug: "bubble", description: "Circled letters. Eye-catching for social bios.", text: mapStr(lo, BUBBLE) },
    { label: "Bold", slug: "bold", description: "Mathematical bold. Strong readable emphasis.", text: mapStr(text, BOLD) },
    { label: "Italic", slug: "italic", description: "Mathematical italic + digits. Elegant flowing style.", text: mapStr(text, ITALIC_FULL) },
    { label: "Bold Italic", slug: "bold-italic", description: "Bold + italic combined. Maximum impact.", text: mapStr(text, BOLD_ITALIC) },
  ];
}

export const PLACEHOLDER_TEXT = "hello world";

const STYLES = [
  { label: "Small Caps", slug: "small-caps", description: "", text: "" },
  { label: "Superscript", slug: "superscript", description: "", text: "" },
  { label: "Subscript", slug: "subscript", description: "", text: "" },
  { label: "Numbers (sup)", slug: "numbers", description: "", text: "" },
  { label: "Numbers (sub)", slug: "numbers-sub", description: "", text: "" },
  { label: "Bubble Text", slug: "bubble", description: "", text: "" },
  { label: "Bold", slug: "bold", description: "", text: "" },
  { label: "Italic", slug: "italic", description: "", text: "" },
  { label: "Bold Italic", slug: "bold-italic", description: "", text: "" },
];

export const PLACEHOLDER_OUTPUTS = convertAll(PLACEHOLDER_TEXT);

export const SCENES = [
  {
    platform: "Instagram Bio",
    example: "hello world",
    display: "travel lover " + mapStr("hello world", SL) + " NYC",
  },
  {
    platform: "Twitter Name",
    example: "GamerPro",
    display: mapStr("GAMERPRO", SU),
  },
  {
    platform: "Birthday Wish",
    example: "happy birthday 2026",
    display: mapStr("happy birthday ", SL) + mapStr("2026", SN),
  },
];