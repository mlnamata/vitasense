# VitaSense

E-shop s prémiovými doplňky stravy: storefront, pokladna, zákaznický účet a
administrace. Organický, „earthy" HealthTech — písková plocha, šalvějová CTA,
tmavě indigové bloky. Mobilní verze se chová jako nativní aplikace (spodní tab
bar, bottom sheet košíku, velké dotykové plochy, safe-area odsazení).
E-shopové vzorce (pruh výhod, výběr podle cíle, recenze, promo karty, magazín)
přebírá z olaola.cz, vizuálně ale drží vlastní značku.

## Stack

| Vrstva     | Technologie                                    |
| ---------- | ---------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, `proxy.ts`) |
| UI         | React 19 — Server Components + Server Actions  |
| Styling    | Tailwind CSS 4 (tokeny v `app/globals.css`)    |
| Ikony      | Lucide React                                   |
| Typografie | Plus Jakarta Sans (`latin-ext`)                |
| Jazyk      | TypeScript (strict)                            |

## Spuštění

```bash
npm install
npm run dev        # http://localhost:3000 (admin bez hesla na /admin)
npm run build      # produkční build
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
npm run images     # přegeneruje obrázky produktů (viz níže)
```

Nasazení: repozitář stačí importovat do Vercelu. Proměnné prostředí z
`.env.example` doplňte v nastavení projektu — **bez `ADMIN_USER` a
`ADMIN_PASSWORD` je administrace v produkci zavřená.**

## Stránky

| Cesta | Obsah |
| --- | --- |
| `/` | landing page — hero, cíle, bestsellery, recenze, předplatné a test, vize, ekosystém, magazín |
| `/obchod`, `/obchod/[kategorie]` | katalog s filtry podle cíle |
| `/produkty/[slug]` | detail — cena na den, složení s % RV, dávkování, recenze, související, JSON-LD |
| `/pokladna`, `/pokladna/dekujeme` | objednávka s validací a přepočtem cen na serveru, potvrzení |
| `/predplatne`, `/magazin`, `/magazin/[slug]`, `/kontakt` | obsahové stránky, kontaktní formulář |
| `/obchodni-podminky`, `/ochrana-osobnich-udaju`, `/doprava-a-platba`, `/reklamace` | právní stránky |
| `/prihlaseni`, `/ucet` | přihlášení e-mailem (magic link), ukázkový účet |
| `/admin/*` | přehled s grafem tržeb, objednávky, produkty, zákazníci, recenze, newsletter + export CSV |

Obchodní stránky se předrenderují staticky; `sitemap.xml` a `robots.txt` se
generují z katalogu (admin, pokladna a účet se neindexují).

## Struktura

```
app/
  (shop)/               storefront — sdílí ShopShell (hlavička, patička, tab bar, košík)
  admin/                administrace s vlastním layoutem
  actions/              server actions: checkout, newsletter, kontakt, auth, admin
  not-found.tsx         404 s chromem obchodu
  sitemap.ts, robots.ts, opengraph-image.jpg, apple-icon.png
components/
  layout/ sections/ product/ cart/ checkout/ shop/ content/ auth/ admin/ ui/
lib/
  content.ts            texty webu, firemní údaje (COMPANY), nastavení
  checkout.ts           doprava, platby a výpočet ceny (sdíleno klientem i serverem)
  legal.ts              obchodní podmínky, GDPR, doprava, reklamace jako data
  data/                 mock data + datová vrstva (katalog, detaily, recenze,
                        články, objednávky)
  admin-auth.ts         HTTP Basic pro /admin
proxy.ts                chrání /admin
scripts/render-images.mjs  generátor produktových obrázků
public/images/          vyrenderované packshoty a hero
```

## Obrázky

Produktové fotky, hero, náhled pro sdílení i ikona pro iOS jsou vyrenderované
skriptem `scripts/render-images.mjs` přes headless Chromium: studiový packshot
na podstavci se stínem listů a kapslemi v barvách kategorie. Po změně katalogu
spusťte `npm run images` (poprvé `npx playwright install chromium`).

Jakmile budou skutečné produktové fotografie, stačí nahradit soubory v
`public/images/products/` (poměr 4 : 5), nebo nastavit `imageUrl` na Supabase
Storage.

## Napojení na Supabase

Komponenty čtou jen z datové vrstvy, takže se mění těla funkcí, ne stránky:

1. **Katalog, detaily, recenze** — `lib/data/products.ts` a `lib/data/content.ts`.
   Mock v `lib/data/*.ts` poslouží jako seed.
2. **Objednávky** — `app/actions/checkout.ts` (insert `orders` + `order_items`,
   u karty přesměrování na platební bránu) a `lib/data/orders-api.ts`.
3. **Přihlášení** — `app/actions/auth.ts` (`signInWithOtp`); `/ucet` pak čte
   přihlášeného uživatele místo ukázkového.
4. **Newsletter a kontakt** — `app/actions/newsletter.ts`, `app/actions/contact.ts`.
5. **Košík** — `components/cart/cartStore.ts` (dnes `localStorage`).
6. **Administrace** — `app/actions/admin.ts`; HTTP Basic v `proxy.ts` nahradí
   Supabase auth s rolí admin. Akce už teď ověřují přístup samy, protože server
   actions jdou zavolat z libovolné URL.

## Před spuštěním doplňte

- **Firemní údaje** — `COMPANY` v `lib/content.ts` (IČO, DIČ, sídlo, telefon)
  a číslo účtu v `CHECKOUT.bank`.
- **Právní texty** — `lib/legal.ts` jsou vzory pro český B2C e-shop; nechte je
  zkontrolovat právníkem.
- **Tvrzení na produktech** — `lib/data/details.ts` používá schválená
  zdravotní tvrzení EU u vitaminů a minerálů; ověřte je proti finálním etiketám.
- **Recenze a hodnocení** jsou zástupná data — nahraďte je skutečnými.
- **Platební brána a dopravci** — napojení na bránu a Zásilkovnu/PPL chybí.

## Design

- **Barvy**: `cream` pozadí, `sand-*` organické tvary, `sage-*` akcent (CTA
  `sage-600`, kontrast 5,4 : 1), `clay-*` teplý akcent pro promo a slevy,
  `ink-*` tmavé bloky, text `slate-800/900`. Každá kategorie má pastelový tón.
- **Tvary**: karty a tlačítka `rounded-2xl`, bloky `rounded-3xl`.
- **Mobil**: swipe karusely se snapováním, dvě karty vedle sebe v obchodě, tab bar
  s aktivní sekcí, bottom sheet košíku, tlačítka 48–56 px. Vodorovné scrollery
  jsou `relative` a gridy s oříznutým textem používají `minmax(0,1fr)`, aby nic
  nerozšiřovalo mobilní viewport.
- **Přístupnost**: skip link, `aria-current`, živá oznámení, vracení fokusu po
  zavření košíku, graf ovladatelný šipkami a s tabulkovou alternativou,
  `prefers-reduced-motion`.
