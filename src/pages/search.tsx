import Layout from "components/common/Layout";
import MenuBrowser from "components/menu/MenuBrowser";
import PageMasthead from "components/ui/PageMasthead";
import { useRouter } from "next/router";
import foodRepo from "repositories/foodRepo";

export default function SearchPage({ foods = [], query = "" }: any) {
  const router = useRouter();
  const category = (router.query.category as string) || "";

  return (
    <Layout
      heroPage
      title={query ? `Search: ${query}` : "Search"}
      description="Search the Cheesy Kitchen menu."
    >
      <PageMasthead
        compact
        label="Search"
        title={query ? `“${query}”` : "Search the menu"}
        description={
          query
            ? `${foods.length} ${foods.length === 1 ? "dish" : "dishes"} matched your search.`
            : "Use the search in the header, or browse everything below."
        }
        crumbs={[{ label: "Search" }]}
      />

      <div className="section surface-cream">
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
