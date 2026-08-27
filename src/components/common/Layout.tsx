import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const SITE_NAME = "Cheesy_Kitchen";

/**
 * Page shell. `children` sit inside a `<main id="main">` so the skip link in
 * the header has a real landmark to jump to, and every page gets a single
 * consistent header/footer — the dashboard, category detail and 404 pages
 * previously rendered with neither.
 *
 * The old Layout also emitted a bare `<title>` with no site name and no
 * viewport, Open Graph or theme-colour tags at all.
 */
export default function Layout({
  title,
  description = "A short menu cooked properly — smashed burgers, 48-hour pizza dough and overnight-brined chicken. Free delivery across Dhaka.",
  keywords = "restaurant, food delivery, burgers, pizza, chicken, pasta, Dhaka",
  children,
}: any) {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — A Short Menu, Cooked Properly`;

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#1A1512" />
      </Head>

      <Header />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
