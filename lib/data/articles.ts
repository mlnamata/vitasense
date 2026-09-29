import type { Article } from "@/lib/types";

/* Magazine articles — the future `articles` table (or a headless CMS). */

export const articles: Article[] = [
  {
    slug: "vecerni-rutina-pro-lepsi-spanek",
    title: "Večerní rutina pro lepší spánek",
    tag: "Spánek",
    tint: "#E8E6F1",
    date: "2026-09-18",
    readingMinutes: 4,
    tip: "Hodinu před spaním ztlumte světla a odložte telefon. Modré světlo z displeje oddaluje nástup melatoninu a s ním i usínání.",
    excerpt:
      "Kvalitní spánek nezačíná v posteli, ale hodinu předtím. Pět jednoduchých kroků, které zvládnete každý večer.",
    sections: [
      {
        heading: "Světlo je hlavní signál",
        paragraphs: [
          "Tělo pozná, že se blíží noc, hlavně podle ubývajícího světla. Jasné stropní světlo a displeje mu ale večer tvrdí, že je stále den. Stačí hodinu před spaním přepnout na lampičky s teplým světlem a telefon odložit mimo ložnici.",
        ],
      },
      {
        heading: "Stejný čas, i o víkendu",
        paragraphs: [
          "Vnitřní hodiny milují pravidelnost. Když chodíte spát a vstáváte ve stejnou dobu i o víkendu, usínání bývá rychlejší a ranní vstávání méně bolestivé.",
        ],
      },
      {
        heading: "Chladná a tmavá ložnice",
        paragraphs: [
          "Ideální teplota pro spánek je kolem 18 °C. Zatemňovací závěsy nebo maska na oči pomohou hlavně v létě, kdy se brzy rozednívá.",
        ],
      },
      {
        heading: "Rituál místo scrollování",
        paragraphs: [
          "Teplá sprcha, pár stránek knihy nebo krátké protažení. Opakovaný rituál tělu napoví, že den končí. Pokud užíváte hořčík, večer je pro něj dobrá chvíle.",
        ],
      },
    ],
  },
  {
    slug: "kdy-pit-kavu",
    title: "Kdy si dát první kávu?",
    tag: "Energie",
    tint: "#F6EAD8",
    date: "2026-09-10",
    readingMinutes: 3,
    tip: "Ranní kávu si nechte na dobu hodinu až dvě po probuzení. Kofein vám pak vydrží déle a odpolední útlum nebude tak prudký.",
    excerpt:
      "Káva hned po probuzení je pro mnohé rituál. Proč se vyplatí pár desítek minut počkat a jak se vyhnout odpolednímu propadu.",
    sections: [
      {
        heading: "Ráno jste nabití i bez kofeinu",
        paragraphs: [
          "Po probuzení je hladina přirozeně povzbuzujících hormonů nejvyšší. Káva v tu chvíli přidává jen málo. Když si ji dáte o hodinu až dvě později, její účinek vás podrží déle.",
        ],
      },
      {
        heading: "Nejdřív sklenice vody",
        paragraphs: [
          "Po noci je tělo mírně dehydratované. Sklenice vody hned po probuzení je jednoduchý způsob, jak začít den svěže.",
        ],
      },
      {
        heading: "Poslední šálek do 14:00",
        paragraphs: [
          "Kofein v těle vydrží mnoho hodin. Odpolední káva se tak může podepsat na kvalitě spánku, i když usnete bez problémů.",
        ],
      },
    ],
  },
  {
    slug: "jak-uzivat-vitamin-d",
    title: "Jak správně užívat vitamin D",
    tag: "Výživa",
    tint: "#E3EBDE",
    date: "2026-09-02",
    readingMinutes: 4,
    tip: "Vitaminy D a K2 berte s jídlem, které obsahuje tuk. Jsou v tucích rozpustné, takže nalačno se vstřebají jen zčásti.",
    excerpt:
      "Od října do března si ho tělo ze slunce téměř nevyrobí. Kdy ho užívat, s čím ho kombinovat a proč dává smysl se nechat otestovat.",
    sections: [
      {
        heading: "Proč právě na podzim",
        paragraphs: [
          "Ve středoevropských zeměpisných šířkách je v zimních měsících slunce příliš nízko na to, aby si kůže vitamin D vytvořila v dostatečném množství.",
        ],
      },
      {
        heading: "Vždy s jídlem",
        paragraphs: [
          "Vitamin D i K2 jsou rozpustné v tucích. Užívejte je proto s jídlem, které obsahuje alespoň trochu tuku — třeba s vajíčky, jogurtem nebo avokádem.",
        ],
      },
      {
        heading: "Znát svou hladinu",
        paragraphs: [
          "Potřeba se liší člověk od člověka. Nejspolehlivější je nechat si hladinu změřit a dávkování přizpůsobit výsledku. Právě proto vzniká domácí test VitaSense.",
        ],
      },
    ],
  },
  {
    slug: "prochazka-po-jidle",
    title: "Deset minut chůze po jídle",
    tag: "Pohyb",
    tint: "#F4E6E2",
    date: "2026-08-26",
    readingMinutes: 3,
    tip: "Deset minut chůze po jídle pomáhá srovnat hladinu cukru v krvi. Nejvíc se to vyplatí hned po obědě.",
    excerpt:
      "Nejjednodušší návyk, který můžete začít ještě dnes. Proč se krátká procházka po jídle vyplatí a jak ji zařadit do pracovního dne.",
    sections: [
      {
        heading: "Svaly jako houba na cukr",
        paragraphs: [
          "Pracující svaly odebírají glukózu z krve. Krátká chůze po jídle proto pomáhá zmírnit výkyvy hladiny cukru, které se pak projevují únavou.",
        ],
      },
      {
        heading: "Nemusí to být dlouho",
        paragraphs: [
          "Stačí deset minut volným tempem. Zavolejte si při chůzi, dojděte pro kávu pěšky nebo si naplánujte krátkou poradu venku.",
        ],
      },
    ],
  },
];
