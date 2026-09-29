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

export const SHOP_PATH = "/obchod";

export const productPath = (slug: string) => `/produkty/${slug}`;

/** Subscription discount, used on product pages and /predplatne. */
export const SUBSCRIPTION_DISCOUNT = 0.15;

/** Landing-page sections, in page order. Ids double as anchors. */
export const SECTIONS = {
  home: "uvod",
  goals: "cile",
  bestsellers: "bestsellery",
  reviews: "recenze",
  vision: "vize",
  ecosystem: "ekosystem",
  magazine: "magazin",
  newsletter: "newsletter",
} as const;

/** `section` marks an anchor on the home page; the rest are routes. */
export const NAV_LINKS = [
  { label: "Obchod", href: SHOP_PATH, section: null },
  { label: "Naše vize", href: `/#${SECTIONS.vision}`, section: SECTIONS.vision },
  { label: "Ekosystém", href: `/#${SECTIONS.ecosystem}`, section: SECTIONS.ecosystem },
] as const;

export const ANNOUNCEMENT = "Doprava zdarma od 1 500 Kč · expedice do 24 hodin";

/** Benefit ticker under the header. */
export const USPS = [
  { icon: "truck", text: "Doprava zdarma od 1 500 Kč" },
  { icon: "package", text: "Expedice do 24 hodin" },
  { icon: "flask", text: "Každá šarže laboratorně testovaná" },
  { icon: "leaf", text: "Čisté složení bez plniv" },
  { icon: "return", text: "30 dní na vrácení" },
  { icon: "gift", text: "Vzorek zdarma k první objednávce" },
] as const;

export const HERO = {
  eyebrow: "Nová generace doplňků stravy",
  title: ["Zdraví, které", "dává smysl."],
  subtitle:
    "Prémiové doplňky stravy a chytrý ekosystém pro vaše tělo. Zjistěte, co vám chybí, a budujte zdravé návyky.",
  primaryCta: "Prozkoumat doplňky",
  secondaryCta: "Jak funguje aplikace?",
  image: {
    src: "/images/hero.png",
    alt: "Magnesium Complex a Vitamin D3 + K2 na kamenném podstavci s kapslemi",
  },
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

export const GOALS = {
  eyebrow: "Podle cíle",
  title: "S čím vám pomůžeme?",
} as const;

export const BESTSELLERS = {
  eyebrow: "Bestsellery",
  title: "Začněte tím, co funguje.",
  subtitle:
    "Doplňky, po kterých naši zákazníci sahají nejčastěji. Poctivé dávky, čisté složení a nic navíc.",
  link: "Všechny doplňky",
} as const;

export const REVIEWS = {
  eyebrow: "Recenze",
  title: "Co říkají naši zákazníci",
  verified: "Ověřený nákup",
} as const;

export const PROMOS = {
  subscription: {
    eyebrow: "Předplatné",
    title: "Předplatné plné výhod",
    perks: [
      "Sleva 15 % na každou zásilku",
      "Doprava vždy zdarma",
      "Změna, pauza nebo zrušení kdykoliv",
      "Připomínka týden před odesláním",
    ],
    cta: "Jak předplatné funguje",
    href: "/predplatne",
    productSlugs: ["ashwagandha-ksm-66", "magnesium-complex", "omega-3-z-ras"],
  },
  test: {
    eyebrow: "Domácí test",
    title: "Nevíte, co vašemu tělu chybí?",
    body: "Test z kapky krve změří klíčové vitaminy a minerály — od vitaminu D po železo. Výsledky máte do týdne v aplikaci.",
    cta: "Jak test funguje",
    results: [
      { label: "Vitamin D", value: "38 ng/ml", level: 0.72, status: "v optimu" },
      { label: "Železo", value: "9 µmol/l", level: 0.3, status: "nízké" },
      { label: "Vitamin B12", value: "412 pmol/l", level: 0.86, status: "v optimu" },
    ],
  },
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

export const MAGAZINE = {
  eyebrow: "VitaSense Magazín",
  title: "Malé návyky, velký rozdíl.",
  link: "Celý magazín",
  href: "/magazin",
  tips: [
    {
      tag: "Spánek",
      tint: "#E8E6F1",
      text: "Hodinu před spaním ztlumte světla a odložte telefon. Modré světlo z displeje oddaluje nástup melatoninu a s ním i usínání.",
    },
    {
      tag: "Energie",
      tint: "#F6EAD8",
      text: "Ranní kávu si nechte na dobu hodinu až dvě po probuzení. Kofein vám pak vydrží déle a odpolední útlum nebude tak prudký.",
    },
    {
      tag: "Výživa",
      tint: "#E3EBDE",
      text: "Vitaminy D a K2 berte s jídlem, které obsahuje tuk. Jsou v tucích rozpustné, takže nalačno se vstřebají jen zčásti.",
    },
    {
      tag: "Pohyb",
      tint: "#F4E6E2",
      text: "Deset minut chůze po jídle pomáhá srovnat hladinu cukru v krvi. Nejvíc se to vyplatí hned po obědě.",
    },
  ],
} as const;

export const SHOP = {
  title: "Obchod",
  subtitle:
    "Všechny doplňky VitaSense na jednom místě. Vyberte si podle cíle, nebo projděte celou nabídku.",
  all: "Vše",
} as const;

export const PRODUCT_PAGE = {
  addToCart: "Přidat do košíku",
  added: "Přidáno do košíku",
  viewCart: "Zobrazit košík",
  perDay: "na den",
  lasts: "Vystačí na",
  subscription: "V předplatném",
  subscriptionLink: "Jak funguje předplatné",
  description: "O produktu",
  benefits: "Proč ho máme rádi",
  composition: "Složení v denní dávce",
  compositionHeaders: ["Látka", "Množství", "% RV*"],
  nrvNote: "* RV = referenční hodnota příjmu pro dospělé",
  usage: "Dávkování",
  ingredients: "Seznam složek",
  warnings: "Upozornění",
  warningText:
    "Nepřekračujte doporučenou denní dávku. Doplněk stravy není náhradou pestré a vyvážené stravy a zdravého životního stylu. Uchovávejte mimo dosah dětí, v suchu a při teplotě do 25 °C.",
  reviews: "Recenze",
  noReviews: "Tento produkt zatím nikdo nehodnotil. Budete první?",
  related: "Mohlo by se vám hodit",
  perks: [
    { icon: "truck", text: "Doprava zdarma od 1 500 Kč" },
    { icon: "package", text: "Expedice do 24 hodin" },
    { icon: "return", text: "30 dní na vrácení" },
  ],
} as const;

export const CHECKOUT = {
  title: "Pokladna",
  empty: "Košík je prázdný",
  emptyBody: "Než budete moct objednat, vyberte si něco z naší nabídky.",
  sections: {
    contact: "Kontakt",
    address: "Doručovací a fakturační adresa",
    shipping: "Doprava",
    payment: "Platba",
    note: "Poznámka k objednávce",
  },
  summary: "Souhrn objednávky",
  subtotal: "Mezisoučet",
  shipping: "Doprava",
  paymentFee: "Platba",
  total: "Celkem k úhradě",
  free: "Zdarma",
  terms: {
    before: "Souhlasím s ",
    link: "obchodními podmínkami",
    after: " a beru na vědomí zpracování osobních údajů.",
  },
  newsletter: "Chci dostávat tipy a novinky e-mailem (můžete kdykoliv zrušit).",
  submit: "Objednat s povinností platby",
  secure: "Zabezpečené spojení · data neukládáme u třetích stran",
  vat: "Ceny jsou uvedeny včetně DPH.",
  thanks: {
    title: "Děkujeme za objednávku!",
    body: "Potvrzení s přehledem objednávky vám právě odchází na e-mail.",
    number: "Číslo objednávky",
    steps: [
      { title: "Potvrzení e-mailem", body: "Do pár minut vám přijde souhrn objednávky." },
      { title: "Expedice do 24 hodin", body: "V pracovní dny balíme ještě ten den." },
      { title: "Sledování zásilky", body: "Jakmile balík předáme dopravci, pošleme odkaz na sledování." },
    ],
    card: "Platbu kartou dokončíte na zabezpečené platební bráně.",
    transfer: "Pro rychlé odeslání zaplaťte převodem nebo QR kódem:",
    cod: "Zaplatíte při převzetí zásilky.",
    continue: "Pokračovat v nákupu",
  },
  /* Placeholder — fill in the real account before launch. */
  bank: {
    account: "000000000/0000",
    iban: "CZ00 0000 0000 0000 0000 0000",
  },
} as const;

export const NEWSLETTER = {
  title: "Zdravé návyky do e-mailu",
  body: "Jednou za dva týdny tipy od našich nutričních specialistů, novinky z vývoje aplikace a 10% sleva na první nákup.",
  consent: "Odesláním souhlasíte se zpracováním e-mailu pro zasílání newsletteru. Odhlásit se můžete jedním kliknutím.",
} as const;

export const FOOTER = {
  tagline:
    "Prémiové doplňky stravy a chytrý ekosystém, který vám pomůže pochopit, co vaše tělo potřebuje.",
  goalsTitle: "Podle cíle",
  columns: [
    {
      title: "VitaSense",
      links: [
        { label: "Všechny doplňky", href: SHOP_PATH },
        { label: "Předplatné", href: "/predplatne" },
        { label: "Naše vize", href: `/#${SECTIONS.vision}` },
        { label: "Ekosystém", href: `/#${SECTIONS.ecosystem}` },
        { label: "Magazín", href: "/magazin" },
      ],
    },
    {
      title: "Nákup",
      links: [
        { label: "Obchodní podmínky", href: "/obchodni-podminky" },
        { label: "Ochrana osobních údajů", href: "/ochrana-osobnich-udaju" },
        { label: "Doprava a platba", href: "/doprava-a-platba" },
        { label: "Reklamace a vrácení", href: "/reklamace" },
        { label: "Kontakt", href: "/kontakt" },
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
