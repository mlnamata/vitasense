# VitaSense

Frontend prémiového e-shopu s doplňky stravy. Organický, „earthy" HealthTech:
písková plocha, šalvějová CTA, tmavě indigový blok ekosystému. Mobilní verze se
chová jako nativní aplikace — spodní tab bar, bottom sheet košíku, velké
dotykové plochy a safe-area odsazení.

E-shopové vzorce přebírá z olaola.cz (pruh výhod, výběr podle cíle, recenze,
promo karty, magazín, tmavá patička), vizuálně ale drží vlastní značku.

## Stack

| Vrstva     | Technologie                               |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)        |
| UI         | React 19, Server Components + Actions     |
| Styling    | Tailwind CSS 4 (tokeny v `app/globals.css`) |
| Ikony      | Lucide React                              |
| Typografie | Plus Jakarta Sans (`latin-ext`)           |
| Jazyk      | TypeScript (strict)                       |

## Spuštění

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produkční build
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
```

Nasazení: repozitář stačí importovat do Vercelu, Next.js se detekuje
automaticky. Proměnné prostředí z `.env.example` se doplní v nastavení projektu.

## Struktura

```
app/
  layout.tsx            font, metadata, košík, navigace, patička
  page.tsx              landing page — složení sekcí
  obchod/page.tsx       všechny produkty s filtry podle cíle
  obchod/[kategorie]/   stránka kategorie (předrenderovaná pro každý cíl)
  prihlaseni/page.tsx   přihlášení e-mailem (magic link)
  not-found.tsx         404 i „připravujeme" pro zatím chybějící stránky
  actions/              server actions: newsletter, přihlášení
  globals.css           design tokeny (@theme), animace, safe-area utility
components/
  layout/               AnnouncementBar, Navbar, MobileTabBar, Footer, NewsletterForm
  sections/             UspStrip, Hero, Goals, Bestsellers, Reviews, Promos,
                        Vision, Ecosystem, Magazine
  product/              ProductCard, ProductGrid, AddToCartButton, Packshot
  shop/                 Catalog (filtry + mřížka), Breadcrumbs
  cart/                 CartProvider, CartDrawer, cartStore
  auth/                 LoginForm
  ui/                   Container, Logo, SectionHeading, EmailInput, Stars, button, SocialIcons
hooks/                  useActiveSection, useScrolled
lib/
  content.ts            veškeré texty landing page na jednom místě
  types.ts              doménové typy (Product, Category, CartLine, FormState)
  data/mock.ts          mock katalog (14 produktů, 6 kategorií, recenze)
  data/products.ts      datová vrstva (produkty, kategorie, recenze, hodnocení)
  format.ts             ceny v Kč, hodnocení, data, české plurály
  validation.ts         validace e-mailu pro server actions
```

## Napojení na Supabase

Kód je rozdělený tak, aby se Supabase zapojila na čtyřech místech a komponenty
zůstaly beze změny:

1. **Katalog a recenze** — `lib/data/products.ts`. Těla funkcí nahraďte dotazem
   `supabase.from("products").select("*, category:categories(*)")` (a obdobně
   pro `reviews`) a řádky namapujte na typy z `lib/types.ts`. Mock data v
   `lib/data/mock.ts` poslouží jako seed. Hodnocení a recenze v mocku jsou
   zástupné — před spuštěním je nahraďte skutečnými.
2. **Přihlášení** — `app/actions/auth.ts`. Místo komentáře zavolejte
   `supabase.auth.signInWithOtp({ email })`. Formulář už počítá s magic linkem.
3. **Newsletter** — `app/actions/newsletter.ts`, upsert do tabulky
   `newsletter_subscribers`.
4. **Košík** — `components/cart/cartStore.ts`. Dnes drží košík hosta v
   `localStorage`; po přihlášení se do funkce `write` doplní synchronizace s
   tabulkou `cart_items`.

Proměnné prostředí jsou v `.env.example`. Fotky produktů z Supabase Storage
jsou povolené v `next.config.mjs`; jakmile má produkt `imageUrl`, karta místo
kreslené lahvičky zobrazí fotku přes `next/image`.

## Design

- **Barvy**: `cream` (#F9F8F6) pozadí, `sand-*` organické tvary, `sage-*`
  akcent — `sage-600` je výplň CTA s kontrastem 5,4 : 1 vůči bílé, `clay-*`
  teplý akcent pro promo a slevy, `ink-*` tmavě indigový blok ekosystému a
  patička, text `slate-800/900`. Každá kategorie má vlastní pastelový tón.
- **Tvary**: karty a tlačítka `rounded-2xl`, obrázková plocha karty
  `rounded-xl`, bloky sekcí `rounded-3xl`. Žádné ostré hrany.
- **Packshoty**: `Packshot` kreslí dózu na kapsle nebo kapátko v barvách
  kategorie. Vše je v jednotkách `cqw`, takže jedna komponenta funguje od
  náhledu v košíku po hero.
- **Mobil**: tab bar s aktivní sekcí (IntersectionObserver), swipe karusely se
  snapováním, v obchodě dvě karty vedle sebe jako v aplikaci, košík jako bottom
  sheet, tlačítka 48–56 px, `viewport-fit=cover` a
  `env(safe-area-inset-bottom)`. Vodorovné scrollery mají `relative`, aby
  z nich neunikaly `sr-only` texty a nerozšiřovaly mobilní viewport.
- **Přístupnost**: skip link, `aria-current` v navigaci, živé oznámení přidání
  do košíku, fokus se po zavření košíku vrací na spouštěč, respektuje
  `prefers-reduced-motion`.
