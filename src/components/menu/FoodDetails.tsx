import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLeaf } from "react-icons/bi";
import { MdCheckCircleOutline, MdOutlineDeliveryDining } from "react-icons/md";
import { categoryLabel, formatPrice } from "../../utils/format";
import { useCart } from "../../utils/useCart";
import Button from "../ui/Button";
import QuantityStepper from "../ui/QuantityStepper";
import Rating from "../ui/Rating";

const ASSURANCES = [
  {
    icon: MdOutlineDeliveryDining,
    text: "Free delivery on every order, anywhere in Dhaka.",
  },
  { icon: BiLeaf, text: "Cooked to order — nothing is made ahead or reheated." },
  {
    icon: MdCheckCircleOutline,
    text: "Not right? Tell us and we'll remake it or refund it.",
  },
];

/**
 * Dish detail buy box.
 *
 * Fixes over the original:
 *  - the dish name is the page's single <h1>; it previously appeared twice,
 *    once via <Title> as an <h2> and again as another <h2> beside the price
 *  - a real quantity control, so you can order two without adding twice
 *  - the "Add To Cart" button no longer pushes you straight to /shipping,
 *    which meant adding a second dish was impossible without going back
 *  - the five hardcoded outline stars and literal "10 Review" are replaced by
 *    the dish's actual rating
 *  - the share row's five social links are gone: four pointed at bare domains
 *    (one, `href="www.linkedin.com"`, resolved as a relative path and 404'd)
 *    and none of them shared anything
 */
export default function FoodDetails({ food }: any) {
  const { name, image, price, shortDesc, rating = 0, countInStock = 0, category } =
    food;

  const { addToCart, quantityOf, pending } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);

  const inBasket = quantityOf(food._id);
  const soldOut = countInStock <= 0;
  const busy = pending === `cart-${food._id}`;
  const lowStock = !soldOut && countInStock <= 5;

  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Photo */}
          <div className="relative overflow-hidden aspect-[4/3] rounded-card bg-cream-100">
            {imageFailed ? (
              <div className="flex items-center justify-center w-full h-full text-sm text-charcoal-300">
                Photo unavailable
              </div>
            ) : (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
                onError={() => setImageFailed(true)}
                priority
              />
            )}
          </div>

          {/* Buy box */}
          <div>
            {category && (
              <p className="mb-3 eyebrow">{categoryLabel(category)}</p>
            )}

            <h1 className="mb-4">{name}</h1>

            <Rating value={rating} size="lg" className="mb-5" />

            <p className="mb-6 text-lg leading-relaxed text-charcoal-600">
              {shortDesc}
            </p>

            <p className="mb-6 text-3xl font-semibold text-charcoal-900">
              {formatPrice(price)}
            </p>

            {soldOut ? (
              <p className="mb-6 alert alert-warning" role="status">
                This one&apos;s off the menu for today. Check back tomorrow — or
                have a look at what else the kitchen has on.
              </p>
            ) : (
              <>
                {lowStock && (
                  <p className="mb-5 text-sm font-medium text-warning-strong">
                    Only {countInStock} left today.
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <QuantityStepper
                    value={quantity}
                    onChange={setQuantity}
                    max={countInStock}
                  />

                  <Button
                    variant="accent"
                    size="lg"
                    loading={busy}
                    onClick={() => addToCart(food, quantity)}
                  >
                    Add to basket
                  </Button>
                </div>

                {inBasket > 0 && (
                  <p className="mb-6 text-sm text-charcoal-500">
                    {inBasket} already in your basket.{" "}
                    <Link href="/cartFood" className="link">
                      View basket
                    </Link>
                  </p>
                )}
              </>
            )}

            <ul className="pt-6 mt-8 space-y-3 border-t border-cream-300">
              {ASSURANCES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-charcoal-600">
                  <Icon
                    className="w-5 h-5 mt-0.5 shrink-0 text-ember-600"
                    aria-hidden="true"
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
