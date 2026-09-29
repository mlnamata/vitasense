/*
 * Every piece of landing-page copy in one place. Components read from here,
 * so editing a headline or a footer link never means touching JSX.
 */

export const BRAND = {
  name: "VitaSense",
  company: "VitaSense s.r.o.",
  email: "ahoj@vitasense.cz",
} as const;

/** Orders at or above this amount ship free. */
export const FREE_SHIPPING_CZK = 1500;

/** Landing-page sections, in page order. Ids double as anchors. */
export const SECTIONS = {
  home: "uvod",
  shop: "obchod",
  vision: "vize",
  ecosystem: "ekosystem",
  newsletter: "newsletter",
} as const;

export const NAV_LINKS = [
  { label: "Obchod", section: SECTIONS.shop },
  { label: "Naše vize", section: SECTIONS.vision },
  { label: "Ekosystém", section: SECTIONS.ecosystem },
] as const;

export const HERO = {
  eyebrow: "Nová generace doplňků stravy",
  title: ["Zdraví, které", "dává smysl."],
  subtitle:
    "Prémiové doplňky stravy a chytrý ekosystém pro vaše tělo. Zjistěte, co vám chybí, a budujte zdravé návyky.",
  primaryCta: "Prozkoumat doplňky",
  secondaryCta: "Jak funguje aplikace?",
  highlights: [
    "Čisté suroviny bez plniv",
    "Každá šarže laboratorně testovaná",
    "Doprava zdarma od 1 500 Kč",
  ],
  /** Packshots composed on the hero visual. */
  productSlugs: ["magnesium-complex", "vitamin-d3-k2"],
  reminder: {
    app: "VitaSense",
    time: "teď",
    title: "Čas na večerní dávku",
    body: "Magnesium Complex · 2 kapsle",
  },
  metric: {
    label: "Vitamin D",
    value: "38 ng/ml",
    note: "v optimu",
  },
} as const;

export const BESTSELLERS = {
  eyebrow: "Bestsellery",
  title: "Začněte tím, co funguje.",
  subtitle:
    "Doplňky, po kterých naši zákazníci sahají nejčastěji. Poctivé dávky, čisté složení a nic navíc.",
} as const;

export const VISION = {
  eyebrow: "Naše vize",
  title: "Doplňky stravy nemají být loterie.",
  body: [
    "Většina lidí bere vitaminy naslepo — podle reklamy, ne podle toho, co jejich tělo skutečně potřebuje.",
    "VitaSense vychází z dat. Používáme jen suroviny s doloženým účinkem, dávkujeme podle studií a každou šarži necháváme nezávisle otestovat.",
  ],
  values: [
    {
      icon: "leaf",
      title: "Čisté složení",
      body: "Žádná umělá barviva, sladidla ani plniva, která tělo nepotřebuje.",
    },
    {
      icon: "flask",
      title: "Ověřené dávky",
      body: "Účinné látky v biologicky dostupných formách a v dávkách podložených výzkumem.",
    },
    {
      icon: "shield",
      title: "Nezávislé testy",
      body: "Každá šarže prochází rozborem na čistotu a těžké kovy v akreditované laboratoři.",
    },
    {
      icon: "recycle",
      title: "Udržitelné balení",
      body: "Sklo a papír místo plastu. Náhradní náplně posíláme v kompostovatelných sáčcích.",
    },
  ],
} as const;

export const ECOSYSTEM = {
  eyebrow: "VitaSense Ekosystém",
  title: "Od testu k návyku. Vše na jednom místě.",
  subtitle:
    "Nejsme jen e-shop. Propojujeme domácí diagnostiku, doplňky na míru a aplikaci, která vás podrží v pravidelnosti.",
  steps: [
    {
      icon: "test",
      title: "Otestujte se",
      body: "Domácí diagnostika chybějících látek. Odběr z prstu zvládnete za pět minut, výsledky máte do týdne přímo v aplikaci.",
    },
    {
      icon: "capsule",
      title: "Doplňte chybějící",
      body: "Podle výsledků sestavíme doplňky na míru z čistých surovin. Jen to, co vaše tělo opravdu potřebuje.",
    },
    {
      icon: "phone",
      title: "Sledujte progres",
      body: "Aplikace vám připomene každou dávku a ukáže, jak se vaše hodnoty mění. Kontrolní test po třech měsících odhalí reálný posun.",
    },
  ],
  cta: "Chci být mezi prvními",
  note: "Aplikace pro iOS a Android právě vzniká. Z čekací listiny se do ní dostanete jako první.",
} as const;

export const NEWSLETTER = {
  title: "Zdravé návyky do e-mailu",
  body: "Jednou za dva týdny tipy od našich nutričních specialistů, novinky z vývoje aplikace a 10% sleva na první nákup.",
  consent: "Odesláním souhlasíte se zpracováním e-mailu pro zasílání newsletteru. Odhlásit se můžete jedním kliknutím.",
} as const;

export const FOOTER = {
  tagline:
    "Prémiové doplňky stravy a chytrý ekosystém, který vám pomůže pochopit, co vaše tělo potřebuje.",
  columns: [
    {
      title: "Obchod",
      links: [
        { label: "Všechny doplňky", href: "/obchod" },
        { label: "Bestsellery", href: `/#${SECTIONS.shop}` },
        { label: "Domácí testy", href: "/testy" },
        { label: "Dárkové poukazy", href: "/poukazy" },
      ],
    },
    {
      title: "VitaSense",
      links: [
        { label: "Naše vize", href: `/#${SECTIONS.vision}` },
        { label: "Ekosystém", href: `/#${SECTIONS.ecosystem}` },
        { label: "Pro odborníky", href: "/odbornici" },
        { label: "Kontakt", href: "/kontakt" },
      ],
    },
    {
      title: "Nákup",
      links: [
        { label: "Obchodní podmínky", href: "/obchodni-podminky" },
        { label: "Ochrana osobních údajů", href: "/ochrana-osobnich-udaju" },
        { label: "Doprava a platba", href: "/doprava-a-platba" },
        { label: "Reklamace a vrácení", href: "/reklamace" },
      ],
    },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  ],
  disclaimer:
    "Doplněk stravy není náhradou pestré a vyvážené stravy a zdravého životního stylu.",
} as const;
