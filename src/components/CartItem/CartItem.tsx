import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { BsFillXSquareFill } from "react-icons/bs";
import { IFood } from "type";
import { Store } from "utils/Store";
interface IProp {
  item: IFood;
}

function CartItem({ item }: IProp) {
  const { dispatch } = useContext(Store);
  const { name, image, price, quantity, slug } = item;
  const removeItemHandler = (item: IFood) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <li className="flex items-center justify-between gap-6 p-5 mb-3 border border-gray-00">
      <div className="flex items-center gap-4">
        <div className="course-image ">
          <Link href={`/foods/${slug}`}>
            <a>
              <Image
                width="50"
                height="50"
                className="object-cover"
                src={image}
                alt=""
              />
            </a>
          </Link>
        </div>
        <div className="CourseName-instructor">
          <Link href={`/foods/${slug}`}>
            <a className="hover:underline hover:text-royal-blue">
              <h5 className="m-0">{name}</h5>
            </a>
          </Link>
        </div>
      </div>
      <div className="price">
        <span className="mb-2 text-2xl font-semibold">${quantity}</span>
      </div>
      <div className="price">
        <span className="mb-2 text-2xl font-semibold">${price}</span>
      </div>
      <button
        className="flex text-2xl text-royal-blue"
        onClick={() => removeItemHandler(item)}
      >
        <BsFillXSquareFill />
      </button>
    </li>
  );
}

export default CartItem;
