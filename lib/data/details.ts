import type { ProductDetails } from "@/lib/types";

/*
 * Product page content, keyed by slug — the future `product_details` table.
 * Vitamin and mineral benefits use EU-authorised health claims at the doses
 * listed; botanicals are described, not claimed. Have the texts checked
 * against the final labels before launch.
 */

export const productDetails: Record<string, ProductDetails> = {
  "magnesium-complex": {
    description: [
      "Hořčík ve formě bisglycinátu je navázaný na aminokyselinu glycin. Tělo ho dobře přijímá a na rozdíl od levných oxidů nezatěžuje trávení.",
      "Doplnili jsme ho o aktivní vitamin B6, který s hořčíkem přirozeně spolupracuje. Ideální jako součást večerního rituálu.",
    ],
    benefits: [
      "Hořčík přispívá ke snížení míry únavy a vyčerpání",
      "Hořčík přispívá k normální činnosti nervové soustavy",
      "Vitamin B6 přispívá k normální psychické činnosti",
      "Chelátová forma šetrná k trávení",
    ],
    composition: [
      { name: "Hořčík (bisglycinát hořečnatý)", amount: "200 mg", nrv: "53 %" },
      { name: "Vitamin B6 (pyridoxal-5'-fosfát)", amount: "1,4 mg", nrv: "100 %" },
    ],
    dose: "2 kapsle denně",
    usage: "Užívejte 2 kapsle denně, ideálně večer, a zapijte sklenicí vody.",
    ingredients:
      "bisglycinát hořečnatý, obal kapsle (hydroxypropylmethylcelulóza), pyridoxal-5'-fosfát.",
    servings: 30,
  },
  "b-komplex-active": {
    description: [
      "Všech osm vitaminů skupiny B v aktivních formách — methylfolát, methylkobalamin a pyridoxal-5'-fosfát tělo nemusí nijak přeměňovat.",
      "Jedna kapsle denně pokryje potřebu i při náročném pracovním tempu nebo rostlinné stravě.",
    ],
    benefits: [
      "Thiamin, riboflavin a niacin přispívají k normálnímu energetickému metabolismu",
      "Vitamin B12 přispívá ke snížení míry únavy a vyčerpání",
      "Folát přispívá k normální krvetvorbě",
      "Aktivní formy vitaminů bez nutnosti přeměny",
    ],
    composition: [
      { name: "Thiamin (B1)", amount: "5 mg", nrv: "455 %" },
      { name: "Riboflavin (B2, riboflavin-5'-fosfát)", amount: "5 mg", nrv: "357 %" },
      { name: "Niacin (B3)", amount: "20 mg", nrv: "125 %" },
      { name: "Kyselina pantothenová (B5)", amount: "10 mg", nrv: "167 %" },
      { name: "Vitamin B6 (pyridoxal-5'-fosfát)", amount: "5 mg", nrv: "357 %" },
      { name: "Biotin (B7)", amount: "50 µg", nrv: "100 %" },
      { name: "Folát (methylfolát)", amount: "400 µg", nrv: "200 %" },
      { name: "Vitamin B12 (methylkobalamin)", amount: "250 µg", nrv: "10 000 %" },
    ],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli denně ráno při jídle. Moč se může přechodně zbarvit do žluta, je to neškodné.",
    ingredients:
      "obal kapsle (hydroxypropylmethylcelulóza), nikotinamid, D-pantothenát vápenatý, thiamin-hydrochlorid, pyridoxal-5'-fosfát, riboflavin-5'-fosfát, L-methylfolát vápenatý, methylkobalamin, D-biotin.",
    servings: 60,
  },
  "vitamin-d3-k2": {
    description: [
      "Veganský vitamin D3 z lišejníku spojený s vitaminem K2 ve formě MK-7. Rozpustili jsme je v extra panenském olivovém oleji, protože jde o vitaminy rozpustné v tucích.",
      "Kapky nemají chuť ani vůni. Stačí je přidat k jídlu, které obsahuje trochu tuku.",
    ],
    benefits: [
      "Vitamin D přispívá k normální funkci imunitního systému",
      "Vitamin D přispívá k udržení normálního stavu kostí",
      "Vitamin K přispívá k udržení normálního stavu kostí",
      "Veganský zdroj D3 z lišejníku",
    ],
    composition: [
      { name: "Vitamin D3 (cholekalciferol z lišejníku)", amount: "25 µg (1 000 IU)", nrv: "500 %" },
      { name: "Vitamin K2 (menachinon-7)", amount: "75 µg", nrv: "100 %" },
    ],
    dose: "3 kapky denně",
    usage: "Užívejte 3 kapky denně s jídlem obsahujícím tuk. Před použitím protřepejte.",
    ingredients: "extra panenský olivový olej, menachinon-7, cholekalciferol (z lišejníku).",
    servings: 180,
  },
  "ashwagandha-ksm-66": {
    description: [
      "KSM-66 je jeden z nejprozkoumanějších extraktů ashwagandhy. Vyrábí se pouze z kořene, bez listů, a je standardizovaný na obsah withanolidů.",
      "Ayurvédská bylina, kterou si lidé zařazují do náročných období. Kapsle neobsahuje žádná plniva.",
    ],
    benefits: [
      "Standardizovaný extrakt KSM-66 pouze z kořene",
      "Minimálně 5 % withanolidů v každé dávce",
      "Bez plniv a protispékavých látek",
      "Vhodné pro vegany",
    ],
    composition: [{ name: "Extrakt z kořene ashwagandhy (Withania somnifera) KSM-66", amount: "600 mg" }],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli denně při jídle. Nedoporučuje se pro těhotné a kojící ženy a osoby s onemocněním štítné žlázy.",
    ingredients: "extrakt z kořene ashwagandhy (Withania somnifera), obal kapsle (hydroxypropylmethylcelulóza).",
    servings: 60,
  },
  "omega-3-z-ras": {
    description: [
      "Ryby omega-3 mastné kyseliny samy nevyrábí — získávají je z mořských řas. My jdeme rovnou ke zdroji: olej z řasy Schizochytrium, pěstované v uzavřených nádržích bez těžkých kovů.",
      "Dvě kapsle denně obsahují 750 mg EPA a DHA. Bez rybí pachuti a bez říhání.",
    ],
    benefits: [
      "DHA přispívá k udržení normální činnosti mozku",
      "EPA a DHA přispívají k normální činnosti srdce",
      "Rostlinný zdroj z mořských řas, vhodné pro vegany",
      "Bez rybí pachuti",
    ],
    composition: [
      { name: "Olej z mořských řas (Schizochytrium sp.)", amount: "1 000 mg" },
      { name: "z toho DHA", amount: "500 mg" },
      { name: "z toho EPA", amount: "250 mg" },
    ],
    dose: "2 kapsle denně",
    usage: "Užívejte 2 kapsle denně během jídla a zapijte vodou.",
    ingredients:
      "olej z mořských řas (Schizochytrium sp.), obal kapsle (modifikovaný škrob, glycerol, karagenan), antioxidant: extrakt z rozmarýnu.",
    servings: 30,
  },
  "probiotika-12-kmenu": {
    description: [
      "Dvanáct kmenů laktobacilů a bifidobakterií v kapsli, která odolá žaludečním kyselinám a otevře se až ve střevě.",
      "Garantujeme 20 miliard živých kultur až do data spotřeby, ne jen v den výroby.",
    ],
    benefits: [
      "12 kmenů laktobacilů a bifidobakterií",
      "20 miliard CFU garantováno do data spotřeby",
      "Acidorezistentní kapsle",
      "Bez laktózy a lepku",
    ],
    composition: [
      { name: "Směs 12 bakteriálních kmenů (Lactobacillus, Bifidobacterium)", amount: "20 mld. CFU" },
      { name: "Inulin z čekanky", amount: "50 mg" },
    ],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli denně ráno, 30 minut před jídlem. Po otevření uchovávejte v chladu.",
    ingredients:
      "směs bakteriálních kultur, obal kapsle (hydroxypropylmethylcelulóza, gellan), inulin z čekanky.",
    servings: 30,
  },
  "klidna-noc": {
    description: [
      "Večerní kombinace L-theaninu ze zeleného čaje, extraktu z meduňky a šafránu. Bez melatoninu.",
      "Skvěle se doplňuje s Magnesium Complex jako součást klidného večerního rituálu.",
    ],
    benefits: [
      "L-theanin ze zeleného čaje",
      "Standardizované extrakty z meduňky a šafránu",
      "Bez melatoninu",
      "Vhodné pro vegany",
    ],
    composition: [
      { name: "L-theanin", amount: "200 mg" },
      { name: "Extrakt z listů meduňky lékařské", amount: "300 mg" },
      { name: "Extrakt z blizen šafránu setého", amount: "28 mg" },
    ],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli večer, přibližně hodinu před spaním.",
    ingredients:
      "extrakt z listů meduňky (Melissa officinalis), L-theanin, obal kapsle (hydroxypropylmethylcelulóza), extrakt z šafránu (Crocus sativus).",
    servings: 30,
  },
  "zelezo-vitamin-c": {
    description: [
      "Bisglycinát železa je šetrný k žaludku a nezpůsobuje zácpu jako běžný síran železnatý.",
      "Přidali jsme vitamin C z aceroly, který vstřebávání železa podporuje.",
    ],
    benefits: [
      "Železo přispívá ke snížení míry únavy a vyčerpání",
      "Železo přispívá k normální tvorbě červených krvinek a hemoglobinu",
      "Vitamin C zvyšuje vstřebávání železa",
      "Chelátová forma šetrná k žaludku",
    ],
    composition: [
      { name: "Železo (bisglycinát železnatý)", amount: "14 mg", nrv: "100 %" },
      { name: "Vitamin C (z aceroly)", amount: "80 mg", nrv: "100 %" },
    ],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli denně nalačno nebo mezi jídly. Nezapíjejte kávou ani čajem.",
    ingredients:
      "extrakt z aceroly (Malpighia glabra), bisglycinát železnatý, obal kapsle (hydroxypropylmethylcelulóza).",
    servings: 60,
  },
  "koenzym-q10-ubiquinol": {
    description: [
      "Ubiquinol je redukovaná, aktivní forma koenzymu Q10. S věkem ho tělo vytváří méně.",
      "Rozpuštěný v olejové kapsli, protože Q10 je rozpustný v tucích.",
    ],
    benefits: [
      "Redukovaná forma Q10 — ubiquinol",
      "100 mg v jedné kapsli",
      "V olejové kapsli pro lepší vstřebávání",
      "Bez umělých barviv",
    ],
    composition: [{ name: "Koenzym Q10 (ubiquinol)", amount: "100 mg" }],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli denně při jídle.",
    ingredients:
      "ubiquinol, olej ze světlice barvířské, obal kapsle (želatina, glycerol), emulgátor: sójový lecitin.",
    servings: 30,
  },
  "zinek-selen": {
    description: [
      "Pikolinát zinku a selen ve formě selenomethioninu — organické formy, které tělo dobře přijímá.",
      "Tříměsíční balení za cenu jedné večeře.",
    ],
    benefits: [
      "Zinek přispívá k normální funkci imunitního systému",
      "Selen přispívá k ochraně buněk před oxidativním stresem",
      "Zinek přispívá k udržení normálního stavu vlasů, nehtů a pokožky",
      "Organické formy minerálů",
    ],
    composition: [
      { name: "Zinek (pikolinát zinečnatý)", amount: "15 mg", nrv: "150 %" },
      { name: "Selen (L-selenomethionin)", amount: "55 µg", nrv: "100 %" },
    ],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli denně při jídle.",
    ingredients:
      "obal kapsle (hydroxypropylmethylcelulóza), pikolinát zinečnatý, L-selenomethionin, protispékavá látka: rýžová mouka.",
    servings: 90,
  },
  "vitamin-c-500": {
    description: [
      "Pufrovaný vitamin C ve formě askorbátu vápenatého je jemnější k žaludku než čistá kyselina askorbová.",
      "Doplnili jsme ho o citrusové bioflavonoidy, se kterými se vitamin C v přírodě běžně vyskytuje.",
    ],
    benefits: [
      "Vitamin C přispívá k normální funkci imunitního systému",
      "Vitamin C přispívá ke snížení míry únavy a vyčerpání",
      "Pufrovaná forma šetrná k žaludku",
      "S citrusovými bioflavonoidy",
    ],
    composition: [
      { name: "Vitamin C (askorbát vápenatý)", amount: "500 mg", nrv: "625 %" },
      { name: "Citrusové bioflavonoidy", amount: "50 mg" },
    ],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli denně při jídle.",
    ingredients:
      "askorbát vápenatý, obal kapsle (hydroxypropylmethylcelulóza), citrusové bioflavonoidy.",
    servings: 90,
  },
  "rhodiola-focus": {
    description: [
      "Rozchodnice růžová roste v chladných horských oblastech Skandinávie a Sibiře. Tradičně se užívá v obdobích zvýšené zátěže.",
      "Extrakt je standardizovaný na obsah rosavinů a salidrosidu, takže víte, co v každé kapsli dostáváte.",
    ],
    benefits: [
      "Standardizováno na 3 % rosavinů a 1 % salidrosidu",
      "Bez kofeinu",
      "Bez plniv",
      "Vhodné pro vegany",
    ],
    composition: [{ name: "Extrakt z kořene rozchodnice růžové (Rhodiola rosea)", amount: "400 mg" }],
    dose: "1 kapsle denně",
    usage: "Užívejte 1 kapsli ráno nebo dopoledne. Nedoporučuje se pro těhotné a kojící ženy.",
    ingredients: "extrakt z kořene rozchodnice růžové (Rhodiola rosea), obal kapsle (hydroxypropylmethylcelulóza).",
    servings: 60,
  },
  "lions-mane": {
    description: [
      "Korálovec ježatý je jedlá houba známá pro svůj neobvyklý vzhled připomínající hřívu. Používáme extrakt pouze z plodnic, ne z mycelia pěstovaného na obilí.",
      "Extrakt je standardizovaný na 30 % polysacharidů.",
    ],
    benefits: [
      "Extrakt pouze z plodnic",
      "Standardizováno na 30 % polysacharidů",
      "Pěstováno v EU",
      "Vhodné pro vegany",
    ],
    composition: [{ name: "Extrakt z plodnice korálovce ježatého (Hericium erinaceus)", amount: "1 000 mg" }],
    dose: "2 kapsle denně",
    usage: "Užívejte 2 kapsle denně, ideálně ráno při jídle.",
    ingredients:
      "extrakt z plodnice korálovce ježatého (Hericium erinaceus), obal kapsle (hydroxypropylmethylcelulóza).",
    servings: 30,
  },
  "psyllium-vlaknina": {
    description: [
      "Osemení jitrocele indického je přirozený zdroj rozpustné vlákniny. Ve vodě nabobtná a vytvoří gel.",
      "Čistota 97 %, bez přidaného cukru a aromat. Snadno se vmíchá do vody, jogurtu nebo smoothie.",
    ],
    benefits: [
      "Čistota osemení 97 %",
      "Bez přidaného cukru a aromat",
      "Snadno se rozmíchá ve vodě i jogurtu",
      "Vhodné pro vegany",
    ],
    composition: [{ name: "Osemení jitrocele vejčitého (Plantago ovata)", amount: "5 g" }],
    dose: "1 lžíce (5 g) denně",
    usage:
      "1 lžíci rozmíchejte ve 250 ml vody a ihned vypijte. Během dne pijte dostatek tekutin. Užívejte odděleně od léků.",
    ingredients: "100 % mleté osemení jitrocele vejčitého (Plantago ovata).",
    servings: 60,
  },
};
