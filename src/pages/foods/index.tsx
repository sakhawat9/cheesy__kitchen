import Layout from "components/common/Layout";
import MenuBrowser from "components/menu/MenuBrowser";
import PageHeader from "components/ui/PageHeader";
import foodRepo from "repositories/foodRepo";

export default function MenuPage({ foods = [] }: any) {
  return (
    <Layout
      title="The Menu"
      description="Every dish Cheesy_Kitchen is cooking right now — burgers, pizza, chicken and pasta, with free delivery across Dhaka."
    >
      <PageHeader
        eyebrow="What we're cooking"
        title="The menu"
        description="A short list, changed only when something earns its place. Search it, filter it, or just scroll."
        crumbs={[{ label: "Menu" }]}
      />

      <div className="section">
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
