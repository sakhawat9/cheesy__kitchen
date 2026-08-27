import Layout from "components/common/Layout";
import MenuBrowser from "components/menu/MenuBrowser";
import PageHeader from "components/ui/PageHeader";
import { useRouter } from "next/router";
import foodRepo from "repositories/foodRepo";

/**
 * Search results.
 *
 * The old /Search page (capital S, so the header's own link would have 404'd
 * had one existed) declared a `prices` array and a `filterSearch` helper that
 * nothing called, then rendered an unfiltered grid regardless of the query.
 * This runs the query server-side and hands the results to the same browser
 * the menu uses, so filtering and sorting work here too.
 */
export default function SearchPage({ foods = [], query = "" }: any) {
  const router = useRouter();
  const category = (router.query.category as string) || "";

  return (
    <Layout
      title={query ? `Search: ${query}` : "Search"}
      description="Search the Cheesy_Kitchen menu."
    >
      <PageHeader
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search the menu"}
        description={
          query
            ? `${foods.length} ${foods.length === 1 ? "dish" : "dishes"} matched your search.`
            : "Use the search box in the header, or browse everything below."
        }
        crumbs={[{ label: "Search" }]}
      />

      <div className="section">
        <div className="container">
          <MenuBrowser foods={foods} initialCategory={category} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }: any) {
  const search = (query.query as string) || "";
  const category = (query.category as string) || "";

  const foods = await foodRepo.search({
    name: search || undefined,
    category: category || undefined,
  });

  return { props: { foods, query: search } };
}
