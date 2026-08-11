

const SMALL_CAPS: Record<string, string> = {
  a: "\u1D00", b: "\u0299", c: "\u1D04", d: "\u1D05", e: "\u1D07",
  f: "\u0493", g: "\u0262", h: "\u029C", i: "\u026A", j: "\u1D0A",
  k: "\u1D0B", l: "\u029F", m: "\u1D0D", n: "\u0274", o: "\u1D0F",
  p: "\u1D18", q: "\u01EB", r: "\u0280", s: "\uA731", t: "\u1D1B",
  u: "\u1D1C", v: "\u1D20", w: "\u1D21", x: "\u00D7", y: "\u028F",
  z: "\u1D22",
};

const SUPERSCRIPT_LOWER: Record<string, string> = {
  a: "\u1D43", b: "\u1D47", c: "\u1D9C", d: "\u1D48", e: "\u1D49",
  f: "\u1DA0", g: "\u1D4D", h: "\u02B0", i: "\u2071", j: "\u02B2",
  k: "\u1D4F", l: "\u02E1", m: "\u1D50", n: "\u207F", o: "\u1D52",
  p: "\u1D56", q: "\u1D60", r: "\u02B3", s: "\u02E2", t: "\u1D57",
  u: "\u1D58", v: "\u1D5B", w: "\u02B7", x: "\u02E3", y: "\u02B8",
  z: "\u1DBB",
};

const SUPERSCRIPT_UPPER: Record<string, string> = {
  A: "\u1D2C", B: "\u1D2E", C: "\u1D9C", D: "\u1D30", E: "\u1D31",
  F: "\u1DA0", G: "\u1D33", H: "\u1D34", I: "\u1D35", J: "\u1D36",
  K: "\u1D37", L: "\u1D38", M: "\u1D39", N: "\u1D3A", O: "\u1D3C",
  P: "\u1D3E", Q: "\u01EB", R: "\u1D3F", S: "\u02E2", T: "\u1D40",
  U: "\u1D41", V: "\u1D5B", W: "\u1D42", X: "\u02E3", Y: "\u02B8",
  Z: "\u1DBB",
};

const SUBSCRIPT_LOWER: Record<string, string> = {
  a: "\u2090", b: "\u0180", c: "\u1D9C", d: "\u1D48", e: "\u2091",
  f: "\u1DA0", g: "\u1D4D", h: "\u2095", i: "\u1D62", j: "\u2C7C",
  k: "\u2096", l: "\u2097", m: "\u2098", n: "\u2099", o: "\u2092",
  p: "\u209A", q: "\u01EB", r: "\u1D63", s: "\u209B", t: "\u209C",
  u: "\u1D64", v: "\u1D65", w: "\u1D21", x: "\u2093", y: "\u1D67",
  z: "\u1D22",
};

const SUPERSCRIPT_NUMBERS: Record<string, string> = {
  "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3",
  "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077",
  "8": "\u2078", "9": "\u2079",
};

const SUBSCRIPT_NUMBERS: Record<string, string> = {
  "0": "\u2080", "1": "\u2081", "2": "\u2082", "3": "\u2083",
  "4": "\u2084", "5": "\u2085", "6": "\u2086", "7": "\u2087",
  "8": "\u2088", "9": "\u2089",
};

function convert(text: string, map: Record<string, string>): string {
  let result = "";
  for (const char of text) {
    result += map[char] ?? char;
  }
  return result;
}

function convertAll(text: string): StyleOutput[] {
  if (!text.trim()) {
    return STYLES.map((s) => ({ ...s, text: "" }));
  }

  return [
    {
      label: "Small Caps",
      slug: "small-caps",
      description: "Petite capital letters. Great for acronyms and emphasis.",
      text: convert(text.toLowerCase(), SMALL_CAPS),
    },
    {
      label: "Superscript",
      slug: "superscript",
      description:
        "Tiny raised letters. Perfect for social bios and cute messages.",
      text: convert(text.toLowerCase(), SUPERSCRIPT_LOWER),
    },
    {
      label: "Subscript",
      slug: "subscript",
      description:
        "Tiny lowered letters. Great for a subtle, unique look.",
      text: convert(text.toLowerCase(), SUBSCRIPT_LOWER),
    },
    {
      label: "Tiny Caps",
      slug: "tiny-caps",
      description:
        "Ultra-tiny superscript small capitals. The smallest of them all.",
      text: convert(
        text.toLowerCase(),
        Object.fromEntries(
          Object.entries(SUPERSCRIPT_LOWER).map(([k, v]) => [
            k,
            SMALL_CAPS[k] ?? v,
          ])
        )
      ),
    },
    {
      label: "Numbers",
      slug: "numbers",
      description:
        "Digits converted to superscript format. Use for dates, IDs, and more.",
      text: convert(text, SUPERSCRIPT_NUMBERS),
    },
  ];
}

const STYLES = [
  { label: "Small Caps", slug: "small-caps", description: "", text: "" },
  { label: "Superscript", slug: "superscript", description: "", text: "" },
  { label: "Subscript", slug: "subscript", description: "", text: "" },
  { label: "Tiny Caps", slug: "tiny-caps", description: "", text: "" },
  { label: "Numbers", slug: "numbers", description: "", text: "" },
];

const PLACEHOLDER_TEXT = "hello world";
const PLACEHOLDER_OUTPUTS = convertAll(PLACEHOLDER_TEXT);

const SCENES = [
  {
    platform: "Instagram Bio",
    example: "hello world 2026",
    prefix: "travel lover ",
    suffix: " NYC",
    template: (text: string) =>
      `travel lover ${convert(text.toLowerCase(), SUPERSCRIPT_LOWER)} NYC`,
  },
  {
    platform: "Discord Name",
    example: "GamerPro",
    prefix: "",
    suffix: "#2026",
    template: (text: string) =>
      `${convert(text, SUPERSCRIPT_UPPER)}#${convert("2026", SUPERSCRIPT_NUMBERS)}`,
  },
  {
    platform: "Birthday Wish",
    example: "happy birthday",
    prefix: "",
    suffix: " 2026",
    template: (text: string) =>
      `${convert(text.toLowerCase(), SUPERSCRIPT_LOWER)} ${convert("2026", SUPERSCRIPT_NUMBERS)}`,
  },
];
