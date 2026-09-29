import { PAYMENT_METHODS, SHIPPING_METHODS } from "@/lib/checkout";
import { COMPANY, FREE_SHIPPING_CZK, SUBSCRIPTION_DISCOUNT } from "@/lib/content";
import { formatPrice } from "@/lib/format";

/*
 * Legal pages as data. These are templates for a Czech B2C e-shop — have a
 * lawyer review them and fill in the bracketed company details (COMPANY in
 * lib/content.ts) before going live.
 */

export type LegalBlock = string | { list: string[] };

export type LegalDocument = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: LegalBlock[] }[];
};

const seller = `${COMPANY.name}, IČO ${COMPANY.ico}, se sídlem ${COMPANY.address}, zapsaná v obchodním rejstříku pod ${COMPANY.register}`;

export const TERMS: LegalDocument = {
  slug: "obchodni-podminky",
  title: "Obchodní podmínky",
  description: "Obchodní podmínky internetového obchodu VitaSense.",
  updated: "2026-09-01",
  intro: `Tyto obchodní podmínky upravují vztahy mezi prodávajícím, společností ${seller}, a kupujícím při nákupu v internetovém obchodě VitaSense.`,
  sections: [
    {
      heading: "Úvodní ustanovení",
      body: [
        "Obchodní podmínky se vztahují na kupní smlouvy uzavřené prostřednictvím internetového obchodu mezi prodávajícím a kupujícím, který je spotřebitelem. Práva a povinnosti neupravené těmito podmínkami se řídí zákonem č. 89/2012 Sb., občanský zákoník, a zákonem č. 634/1992 Sb., o ochraně spotřebitele.",
        "Prodávaný sortiment tvoří doplňky stravy. Doplněk stravy není náhradou pestré a vyvážené stravy a zdravého životního stylu.",
      ],
    },
    {
      heading: "Uživatelský účet",
      body: [
        "Kupující může nakupovat bez registrace nebo si založit uživatelský účet. Přihlášení probíhá odkazem zaslaným na e-mail. Kupující odpovídá za správnost údajů v účtu a za zabezpečení přístupu ke své e-mailové schránce.",
      ],
    },
    {
      heading: "Uzavření kupní smlouvy",
      body: [
        "Prezentace zboží v obchodě je informativní a není návrhem na uzavření smlouvy. Kupující odesílá objednávku tlačítkem „Objednat s povinností platby“. Před odesláním může objednávku zkontrolovat a opravit.",
        "Kupní smlouva vzniká doručením potvrzení objednávky na e-mail kupujícího. Prodávající je oprávněn objednávku odmítnout zejména při zjevné chybě v ceně nebo nedostupnosti zboží; v takovém případě vrátí přijatou platbu bez zbytečného odkladu.",
      ],
    },
    {
      heading: "Cena a platební podmínky",
      body: [
        "Ceny zboží jsou uvedeny včetně DPH. Cena dopravy a případný poplatek za platbu jsou zobrazeny v pokladně před odesláním objednávky.",
        {
          list: PAYMENT_METHODS.map(
            (method) =>
              `${method.label} — ${method.feeCzk === 0 ? "bez poplatku" : `poplatek ${formatPrice(method.feeCzk)}`}`
          ),
        },
        "Při platbě převodem je kupní cena splatná do 7 dnů od uzavření smlouvy. Zboží odesíláme po připsání platby na účet prodávajícího.",
      ],
    },
    {
      heading: "Doprava a dodání",
      body: [
        `Zboží doručujeme na území České republiky. Při objednávce nad ${formatPrice(FREE_SHIPPING_CZK)} je doprava zdarma. Objednávky přijaté v pracovní den do 14:00 expedujeme týž den, ostatní nejpozději následující pracovní den.`,
        "Kupující je povinen zásilku při převzetí zkontrolovat a případné poškození obalu ihned oznámit dopravci.",
      ],
    },
    {
      heading: "Odstoupení od smlouvy",
      body: [
        "Spotřebitel má právo odstoupit od smlouvy bez udání důvodu do 14 dnů od převzetí zboží. Prodávající tuto lhůtu dobrovolně prodlužuje na 30 dnů.",
        "Z hygienických důvodů nelze vrátit zboží, u něhož byl porušen ochranný obal nebo pečeť (§ 1837 písm. g) občanského zákoníku).",
        "Peníze vrátíme do 14 dnů od odstoupení stejným způsobem, jakým byly přijaty, nejdříve však po obdržení vráceného zboží. Náklady na vrácení zboží nese kupující.",
      ],
    },
    {
      heading: "Práva z vadného plnění",
      body: [
        "Kupující má práva z vadného plnění po dobu 24 měsíců od převzetí zboží, nejdéle však do data minimální trvanlivosti uvedeného na obalu. Postup je popsán na stránce Reklamace a vrácení.",
      ],
    },
    {
      heading: "Předplatné",
      body: [
        `Předplatné je opakovaná dodávka zvoleného zboží v nastaveném intervalu se slevou ${Math.round(SUBSCRIPTION_DISCOUNT * 100)} %. Každá dodávka je samostatnou kupní smlouvou. Předplatné lze kdykoli upravit, pozastavit nebo zrušit v uživatelském účtu, nejpozději 3 dny před plánovaným odesláním.`,
      ],
    },
    {
      heading: "Mimosoudní řešení sporů",
      body: [
        "K mimosoudnímu řešení spotřebitelských sporů je příslušná Česká obchodní inspekce, Štěpánská 15, 120 00 Praha 2, www.adr.coi.cz. Spotřebitel může využít také platformu pro řešení sporů online na ec.europa.eu/consumers/odr.",
      ],
    },
    {
      heading: "Závěrečná ustanovení",
      body: [
        "Smlouva se uzavírá v českém jazyce. Prodávající může obchodní podmínky měnit; na již uzavřené smlouvy se vztahuje znění platné v době odeslání objednávky.",
        `Kontakt na prodávajícího: ${COMPANY.email}, ${COMPANY.phone}.`,
      ],
    },
  ],
};

export const PRIVACY: LegalDocument = {
  slug: "ochrana-osobnich-udaju",
  title: "Ochrana osobních údajů",
  description: "Jak VitaSense zpracovává osobní údaje zákazníků.",
  updated: "2026-09-01",
  intro: `Správcem osobních údajů je ${seller}. Osobní údaje zpracováváme v souladu s nařízením (EU) 2016/679 (GDPR) a jen v rozsahu, který opravdu potřebujeme.`,
  sections: [
    {
      heading: "Jaké údaje zpracováváme",
      body: [
        {
          list: [
            "identifikační a kontaktní údaje — jméno, e-mail, telefon, doručovací adresa",
            "údaje o objednávkách a platbách",
            "údaje z uživatelského účtu a předplatného",
            "výsledky domácích testů, pokud je do aplikace nahrajete (údaje o zdraví, zpracovávané jen s vaším výslovným souhlasem)",
            "technické údaje — IP adresa, typ zařízení, cookies",
          ],
        },
      ],
    },
    {
      heading: "Proč a na jakém základě",
      body: [
        {
          list: [
            "vyřízení objednávky a doručení — plnění smlouvy",
            "účetnictví a daně — právní povinnost",
            "zasílání newsletteru — souhlas, případně oprávněný zájem u stávajících zákazníků",
            "zlepšování webu a měření návštěvnosti — souhlas udělený v nastavení cookies",
            "zpracování výsledků testů a doporučení doplňků — výslovný souhlas",
          ],
        },
      ],
    },
    {
      heading: "Jak dlouho údaje uchováváme",
      body: [
        "Údaje o objednávkách uchováváme po dobu 10 let kvůli daňovým předpisům. Údaje pro newsletter do odvolání souhlasu. Výsledky testů do smazání účtu nebo odvolání souhlasu.",
      ],
    },
    {
      heading: "Komu údaje předáváme",
      body: [
        "Údaje předáváme jen zpracovatelům, kteří je potřebují k poskytnutí služby: dopravcům (Zásilkovna, PPL), poskytovateli platební brány, poskytovateli hostingu a databáze, e-mailingové službě a účetní kanceláři. Údaje neprodáváme.",
      ],
    },
    {
      heading: "Vaše práva",
      body: [
        "Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování, přenositelnost a právo vznést námitku. Souhlas můžete kdykoli odvolat. Stížnost lze podat u Úřadu pro ochranu osobních údajů (www.uoou.cz).",
        `Žádosti vyřizujeme na ${COMPANY.email} nejpozději do 30 dnů.`,
      ],
    },
    {
      heading: "Cookies",
      body: [
        "Nezbytné cookies používáme pro fungování košíku a přihlášení. Analytické a marketingové cookies ukládáme jen s vaším souhlasem, který můžete kdykoli změnit.",
      ],
    },
  ],
};

export const SHIPPING: LegalDocument = {
  slug: "doprava-a-platba",
  title: "Doprava a platba",
  description: "Ceny dopravy, způsoby platby a dodací lhůty VitaSense.",
  updated: "2026-09-01",
  intro: `Při objednávce nad ${formatPrice(FREE_SHIPPING_CZK)} je doprava vždy zdarma. Objednávky přijaté v pracovní den do 14:00 odesíláme ještě týž den.`,
  sections: [
    {
      heading: "Doprava",
      body: [
        {
          list: SHIPPING_METHODS.map(
            (method) =>
              `${method.label} — ${formatPrice(method.priceCzk)}, zdarma od ${formatPrice(FREE_SHIPPING_CZK)}. ${method.description}.`
          ),
        },
        "Zásilky balíme do recyklovaného papíru bez plastové výplně.",
      ],
    },
    {
      heading: "Platba",
      body: [
        {
          list: PAYMENT_METHODS.map(
            (method) =>
              `${method.label} — ${method.feeCzk === 0 ? "zdarma" : formatPrice(method.feeCzk)}. ${method.description}.`
          ),
        },
        "Platby kartou zpracovává certifikovaná platební brána; údaje o kartě k nám nikdy nedorazí.",
      ],
    },
    {
      heading: "Faktura",
      body: ["Daňový doklad posíláme e-mailem po odeslání zásilky a najdete ho také ve svém účtu."],
    },
  ],
};

export const RETURNS: LegalDocument = {
  slug: "reklamace",
  title: "Reklamace a vrácení",
  description: "Jak vrátit zboží nebo uplatnit reklamaci u VitaSense.",
  updated: "2026-09-01",
  intro: "Na vrácení máte místo zákonných 14 dnů celých 30 dnů. A když něco nebude v pořádku, vyřešíme to rychle a bez papírování.",
  sections: [
    {
      heading: "Vrácení zboží do 30 dnů",
      body: [
        {
          list: [
            `Napište nám na ${COMPANY.email} číslo objednávky a co chcete vrátit.`,
            "Zboží zabalte a pošlete na adresu, kterou vám obratem pošleme. Neposílejte ho na dobírku.",
            "Peníze vrátíme do 14 dnů od doručení zásilky na účet, ze kterého jste platili.",
          ],
        },
        "Z hygienických důvodů nelze vrátit balení s porušenou ochrannou pečetí.",
      ],
    },
    {
      heading: "Reklamace",
      body: [
        "Pokud zboží dorazí poškozené nebo má vadu, pošlete nám fotografii a popis na e-mail. Reklamaci vyřídíme nejpozději do 30 dnů, obvykle během několika dnů — výměnou, vrácením peněz nebo slevou podle vaší volby.",
        "Poškozenou zásilku prosím ihned sepište s dopravcem, případně nám ji vyfoťte ještě neotevřenou.",
      ],
    },
    {
      heading: "Předplatné",
      body: [
        "Předplatné můžete kdykoli pozastavit nebo zrušit ve svém účtu. Dodávku, která už byla odeslána, můžete vrátit stejně jako běžnou objednávku.",
      ],
    },
  ],
};

export const LEGAL_DOCUMENTS = [TERMS, PRIVACY, SHIPPING, RETURNS];
