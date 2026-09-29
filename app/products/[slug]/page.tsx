import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../lib/products";
import { translations, type Lang } from "../../../lib/i18n";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const lang: Lang =
    query.lang === "en" || query.lang === "ru"
      ? query.lang
      : "ka";

  const t = translations[lang];

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `${t.whatsappMessage} ${product.name} - ${product.price}`
  );

  const whatsappUrl =
    `https://wa.me/995598561811?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-[#1e1f22] text-[#f2f3f5]">

      {/* HEADER */}
      <header className="border-b border-[#35363c] bg-[#18191c]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">

          <Link
            href={`/?lang=${lang}`}
            className="text-xl font-black tracking-[0.28em]"
          >
            XELAXI
          </Link>

          <div className="flex items-center gap-5">

            <div className="flex rounded-lg bg-[#2b2d31] p-1 text-xs font-bold">

              <Link
                href={`/products/${slug}?lang=ka`}
                className={`rounded-md px-3 py-2 transition ${
                  lang === "ka"
                    ? "bg-[#5865f2] text-white"
                    : "text-[#949ba4] hover:text-white"
                }`}
              >
                KA
              </Link>

              <Link
                href={`/products/${slug}?lang=en`}
                className={`rounded-md px-3 py-2 transition ${
                  lang === "en"
                    ? "bg-[#5865f2] text-white"
                    : "text-[#949ba4] hover:text-white"
                }`}
              >
                EN
              </Link>

              <Link
                href={`/products/${slug}?lang=ru`}
                className={`rounded-md px-3 py-2 transition ${
                  lang === "ru"
                    ? "bg-[#5865f2] text-white"
                    : "text-[#949ba4] hover:text-white"
                }`}
              >
                RU
              </Link>

            </div>

            <Link
              href={`/?lang=${lang}#products`}
              className="hidden text-sm text-[#b5bac1] transition hover:text-white sm:block"
            >
              ← {t.home}
            </Link>

          </div>
        </div>
      </header>


      {/* PRODUCT */}
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-2 lg:items-center">

        {/* IMAGE */}
        <div className="overflow-hidden rounded-2xl border border-[#35363c] bg-[#2b2d31] p-5">

          <div className="relative h-[360px] rounded-xl bg-[#232428] sm:h-[500px]">

            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-contain p-8"
            />

          </div>

        </div>


        {/* INFO */}
        <div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#949cf7]">
            {t.product}
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#b5bac1]">
            {product.description[lang]}
          </p>

          <div className="mt-8 text-4xl font-black">
            {product.price}
          </div>


          <div className="mt-10 flex flex-col gap-3 sm:flex-row">

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#5865f2] px-7 py-4 text-center font-bold text-white transition hover:bg-[#4752c4]"
            >
              {t.orderWhatsapp}
            </a>

            <Link
              href={`/?lang=${lang}#products`}
              className="rounded-lg bg-[#2b2d31] px-7 py-4 text-center font-bold text-[#dbdee1] transition hover:bg-[#35373c]"
            >
              {t.otherProducts}
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}