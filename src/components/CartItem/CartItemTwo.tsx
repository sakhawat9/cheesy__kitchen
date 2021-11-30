import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { IFood } from "type";
import { Store } from "utils/Store";
interface IProp {
  item: IFood;
}

function CartItem({ item }: IProp) {
  const { state, dispatch } = useContext(Store);
  const { price, slug } = item;
  const removeItemHandler = (item: IFood) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <li className="flex items-center justify-between gap-6 p-5 mb-3 border border-gray-00">
      <div className="flex items-center gap-4">
        <div className="course-image ">
          <Link href={`/courses/${slug}`}>
            <a>
              <Image
                width="50"
                height="50"
                className="object-cover"
                src="{img}"
                alt=""
              />
            </a>
          </Link>
        </div>
        <div className="CourseName-instructor">
          <Link href={`/courses/${slug}`}>
            <a className="hover:underline hover:text-royal-blue">
              <h6 className="m-0">This is Title</h6>
            </a>
          </Link>
        </div>
      </div>
      <div className="price">
        <span className="mb-2 text-lg font-semibold">- ${price}</span>
      </div>
    </li>
  );
}

export default CartItem;
