import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuFlame, LuLeaf, LuTruck } from "react-icons/lu";
import { categoryLabel, formatPrice } from "../../utils/format";
import { useCart } from "../../utils/useCart";
import Button from "../ui/Button";
import QuantityStepper from "../ui/QuantityStepper";
import Rating from "../ui/Rating";

const ASSURANCES = [
  { icon: LuTruck, text: "Free delivery on every order, anywhere in Dhaka." },
  { icon: LuFlame, text: "Cooked to order — nothing is made ahead or reheated." },
  { icon: LuLeaf, text: "Not right? Tell us and we'll remake it or refund it." },
];

/**
 * The dish page's ordering panel.
 *
 * The photograph runs tall and full-width of its column with the dish name set
 * over its foot, so the plate is the first and largest thing on the page; the
 * ordering controls sit alongside on a warm panel rather than in a bordered
 * box. `sticky` keeps the price and the add button in view while the reader
 * scrolls the description on desktop.
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
    <section className="section-sm">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Photograph */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden aspect-[4/3] rounded-panel bg-oat-200">
              {imageFailed ? (
                <div className="flex items-center justify-center w-full h-full text-sm text-espresso-400">
                  Photo unavailable
                </div>
              ) : (
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 1024px) 92vw, 58vw"
                  className="object-cover"
                  onError={() => setImageFailed(true)}
                  priority
                />
              )}
            </div>
          </div>

          {/* Ordering panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {category && (
                  <Link href={`/category/${category}`} className="label link-wipe">
                    {categoryLabel(category)}
                  </Link>
                )}
                <Rating value={rating} size="lg" />
              </div>

              <h1 className="text-display">{name}</h1>

              <p className="mt-5 text-lg leading-relaxed text-espresso-500">
                {shortDesc}
              </p>

              <p className="mt-8 text-4xl font-semibold font-display text-chilli-600">
                {formatPrice(price)}
              </p>

              {soldOut ? (
                <p className="mt-8 alert alert-warning" role="status">
                  This one&apos;s off the menu for today. Check back tomorrow — or
                  have a look at what else the kitchen has on.
                </p>
              ) : (
                <>
                  {lowStock && (
                    <p className="flex items-center gap-2 mt-5 text-sm font-medium text-warning-strong">
                      <LuFlame className="w-4 h-4" aria-hidden="true" />
                      Only {countInStock} left today.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <QuantityStepper
                      value={quantity}
                      onChange={setQuantity}
                      max={countInStock}
                    />

                    <Button
                      variant="order"
                      size="lg"
                      loading={busy}
                      onClick={() => addToCart(food, quantity)}
                      className="flex-1"
                    >
                      Add to basket
                    </Button>
                  </div>

                  {inBasket > 0 && (
                    <p className="mt-4 text-sm text-espresso-500">
                      {inBasket} already in your basket.{" "}
                      <Link href="/cartFood" className="link">
                        View basket
                      </Link>
                    </p>
                  )}
                </>
              )}

              <ul className="pt-8 mt-10 space-y-4 border-t border-espresso-200/60">
                {ASSURANCES.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-sm text-espresso-600"
                  >
                    <Icon
                      className="w-5 h-5 mt-0.5 shrink-0 text-saffron-600"
                      aria-hidden="true"
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
