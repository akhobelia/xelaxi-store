import Image from "next/image";
import Link from "next/link";
import { products } from "../lib/products";
import { translations, type Lang } from "../lib/i18n";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;

  const lang: Lang =
    params.lang === "en" || params.lang === "ru"
      ? params.lang
      : "ka";

  const t = translations[lang];
  const featured = products[0];

  return (
    <main className="min-h-screen bg-[#1e1f22] text-[#f2f3f5]">

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#35363c] bg-[#18191c]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">

          <Link
            href={`/?lang=${lang}`}
            className="text-xl font-black tracking-[0.28em]"
          >
            XELAXI
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#b5bac1] md:flex">
            <a
              href="#products"
              className="transition hover:text-white"
            >
              {t.products}
            </a>

            <a
              href="#about"
              className="transition hover:text-white"
            >
              {t.about}
            </a>

            <a
              href="#contact"
              className="transition hover:text-white"
            >
              {t.contact}
            </a>
          </nav>

          {/* LANGUAGE */}
          <div className="flex rounded-lg bg-[#2b2d31] p-1 text-xs font-bold">

            <Link
              href="/?lang=ka"
              className={`rounded-md px-3 py-2 transition ${
                lang === "ka"
                  ? "bg-[#5865f2] text-white"
                  : "text-[#949ba4] hover:text-white"
              }`}
            >
              KA
            </Link>

            <Link
              href="/?lang=en"
              className={`rounded-md px-3 py-2 transition ${
                lang === "en"
                  ? "bg-[#5865f2] text-white"
                  : "text-[#949ba4] hover:text-white"
              }`}
            >
              EN
            </Link>

            <Link
              href="/?lang=ru"
              className={`rounded-md px-3 py-2 transition ${
                lang === "ru"
                  ? "bg-[#5865f2] text-white"
                  : "text-[#949ba4] hover:text-white"
              }`}
            >
              RU
            </Link>

          </div>
        </div>
      </header>


      {/* HERO */}
      <section className="px-5 pb-24 pt-36 md:px-8 md:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          {/* LEFT */}
          <div>

            <div className="mb-5 inline-flex rounded-md bg-[#2b2d31] px-3 py-2 text-xs font-bold tracking-[0.2em] text-[#949cf7]">
              XELAXI STORE
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.08] sm:text-6xl">
              {t.hero1}

              <span className="mt-2 block text-[#949cf7]">
                {t.hero2}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#b5bac1] sm:text-lg">
              {t.heroText}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <a
                href="#products"
                className="rounded-lg bg-[#5865f2] px-7 py-4 text-center font-bold text-white transition hover:bg-[#4752c4]"
              >
                {t.viewProducts}
              </a>

              <a
                href="#contact"
                className="rounded-lg bg-[#2b2d31] px-7 py-4 text-center font-bold text-[#dbdee1] transition hover:bg-[#35373c]"
              >
                {t.contactUs}
              </a>

            </div>
          </div>


          {/* FEATURED PRODUCT */}
          <div className="overflow-hidden rounded-2xl border border-[#35363c] bg-[#2b2d31]">

            <div className="relative h-[360px] bg-[#232428] sm:h-[430px]">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                priority
                className="object-contain p-8 transition duration-500 hover:scale-105"
              />
            </div>

            <div className="p-6">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#949cf7]">
                    Featured
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {featured.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#b5bac1]">
                    {featured.description[lang]}
                  </p>
                </div>

                <span className="shrink-0 text-2xl font-black">
                  {featured.price}
                </span>

              </div>

              <Link
                href={`/products/${featured.slug}?lang=${lang}`}
                className="mt-6 inline-flex rounded-lg bg-[#35373c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#404249]"
              >
                {t.view} →
              </Link>

            </div>
          </div>

        </div>
      </section>


      {/* PRODUCTS */}
      <section
        id="products"
        className="scroll-mt-24 border-t border-[#35363c] bg-[#18191c] px-5 py-24 md:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#949cf7]">
              PRODUCTS
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              {t.popular}
            </h2>
          </div>


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (

              <Link
                key={product.slug}
                href={`/products/${product.slug}?lang=${lang}`}
                className="group overflow-hidden rounded-2xl border border-[#35363c] bg-[#2b2d31] transition duration-300 hover:-translate-y-1 hover:border-[#5865f2]"
              >

                <div className="relative h-72 bg-[#232428]">

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-7 transition duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="p-6">

                  <div className="flex items-start justify-between gap-5">

                    <div>
                      <h3 className="text-xl font-black">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#b5bac1]">
                        {product.description[lang]}
                      </p>
                    </div>

                    <span className="shrink-0 text-xl font-black">
                      {product.price}
                    </span>

                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#3f4147] pt-5">

                    <span className="text-xs font-bold tracking-widest text-[#949ba4]">
                      XELAXI
                    </span>

                    <span className="text-sm font-bold text-[#949cf7]">
                      {t.view} →
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>
        </div>
      </section>


      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-24 px-5 py-24 md:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#949cf7]">
              {t.why}
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">
              {t.goodProduct} {t.goodPrice}
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-[#35363c] bg-[#2b2d31] p-7">
              <span className="text-sm font-black text-[#949cf7]">
                01
              </span>

              <h3 className="mt-12 text-xl font-bold">
                {t.selectedProducts}
              </h3>
            </div>

            <div className="rounded-2xl border border-[#35363c] bg-[#2b2d31] p-7">
              <span className="text-sm font-black text-[#949cf7]">
                02
              </span>

              <h3 className="mt-12 text-xl font-bold">
                {t.competitivePrices}
              </h3>
            </div>

            <div className="rounded-2xl border border-[#35363c] bg-[#2b2d31] p-7">
              <span className="text-sm font-black text-[#949cf7]">
                03
              </span>

              <h3 className="mt-12 text-xl font-bold">
                {t.fastCommunication}
              </h3>
            </div>

          </div>
        </div>
      </section>


      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-[#35363c] bg-[#18191c] px-5 py-24 md:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="rounded-2xl border border-[#35363c] bg-[#2b2d31] px-6 py-20 text-center">

            <h2 className="text-4xl font-black md:text-6xl">
              {t.interested}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[#b5bac1]">
              {t.contactText}
            </p>

            <a
              href="https://wa.me/995598561811"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-lg bg-[#5865f2] px-8 py-4 font-bold text-white transition hover:bg-[#4752c4]"
            >
              WhatsApp
            </a>

          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="border-t border-[#35363c] bg-[#18191c] px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#949ba4] sm:flex-row sm:items-center sm:justify-between">

          <span>© 2026 XELAXI.</span>

          <span>Tech • Gaming • Accessories</span>

        </div>

      </footer>

    </main>
  );
}