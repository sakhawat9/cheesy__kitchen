import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const SITE_NAME = "Cheesy Kitchen";

/**
 * Page shell. `children` sit inside a `<main id="main">` so the skip link has
 * a real landmark to jump to.
 *
 * `heroPage` tells the header to float transparently over the top of the page
 * until the reader scrolls — used by pages that open on a full-bleed
 * photograph. Everything else gets a solid bar and top padding to clear it,
 * since the header is fixed rather than sticky.
 */
export default function Layout({
  title,
  description = "A short menu cooked properly — smashed burgers, 48-hour pizza dough and overnight-brined chicken. Free delivery across Dhaka.",
  keywords = "restaurant, food delivery, burgers, pizza, chicken, pasta, Dhaka",
  heroPage = false,
  children,
}: any) {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — A Short Menu, Cooked Properly`;

  return (
    <div className="flex flex-col min-h-screen bg-oat-100">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="theme-color" content="#191110" />
      </Head>

      <Header transparent={heroPage} />

      {/* Pages that open on a photograph slide under the fixed header; the
          rest need to clear it. */}
      <main id="main" className={`flex-1 ${heroPage ? "" : "pt-[var(--header-height)]"}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
