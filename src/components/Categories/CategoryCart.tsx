import Link from "next/link";
const CategoryCart = ({ fd }: any) => {
  return (
    <Link href={`/category/${fd.link}`}>
      <a>
        <div className="category-food__area__wrapper__item">
          <div className="category-food__area__wrapper__item__image">
            <img
              src={fd.img}
              alt=""
            />
          </div>
          <h6>{fd.name}</h6>
        </div>
      </a>
    </Link>
  );
};

export default CategoryCart;
