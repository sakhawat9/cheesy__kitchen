import Layout from "components/common/Layout";
import MenuBrowser from "components/menu/MenuBrowser";
import PageMasthead from "components/ui/PageMasthead";
import foodRepo from "repositories/foodRepo";

export default function MenuPage({ foods = [] }: any) {
  return (
    <Layout
      heroPage
      title="The Menu"
      description="Every dish Cheesy Kitchen is cooking right now — burgers, pizza, chicken and pasta, with free delivery across Dhaka."
    >
      <PageMasthead
        label="What we're cooking"
        title="The menu"
        description="A short list, changed only when something earns its place. Read it as a menu, or switch to photographs."
        crumbs={[{ label: "Menu" }]}
        image={foods[0]?.image}
      />

      <div className="section surface-cream">
        <div className="container">
          <MenuBrowser foods={foods} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const foods = await foodRepo.listAll();
  return { props: { foods } };
}
