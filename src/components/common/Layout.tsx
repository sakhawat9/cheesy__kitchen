import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayout {
  title: string;
  keywords: string;
  description: string;
  children: any;
}

export default function Layout({
  title,
  keywords,
  description,
  children,
}: ILayout) {
  const router = useRouter();

  //   const isDashboard = router.asPath.startsWith("/dashboard");
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Cheesy_kitchen | Restaurant-Website.",
  description: "Find the trendy foods",
  keywords: "foods, cheesy, kitchen",
};
