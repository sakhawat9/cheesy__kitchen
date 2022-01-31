import Link from "next/link";
const CategoryCart = ({ fd }: any) => {
  return (
    <Link href="#">
      <a>
        <div className="h-full p-8 text-center rounded shadow-lg bg-white-100 hover:bg-amazon-500 hover:text-white ">
          <div className="flex justify-center">
            <img
              className="object-cover p-1 mb-4 rounded-full shadow-lg hover:bg-white w-36 h-36"
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
