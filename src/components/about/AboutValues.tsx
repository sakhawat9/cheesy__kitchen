import { BiLeaf, BiTime } from "react-icons/bi";
import { MdOutlineDeliveryDining, MdOutlineLocalFireDepartment } from "react-icons/md";

const VALUES = [
  {
    icon: BiTime,
    title: "Slow where it counts",
    description:
      "Forty-eight hours for dough, overnight for brine. The waiting is the recipe.",
  },
  {
    icon: MdOutlineLocalFireDepartment,
    title: "Cooked to order",
    description:
      "Nothing is made ahead or held under a lamp. It starts when your ticket prints.",
  },
  {
    icon: BiLeaf,
    title: "A short list, prepped daily",
    description:
      "Four categories means everything on the menu is fresh that morning.",
  },
  {
    icon: MdOutlineDeliveryDining,
    title: "Free delivery, no minimum",
    description:
      "Across Dhaka, on every order, however small. It shouldn't cost extra to eat well.",
  },
];

export default function AboutValues() {
  return (
    <section className="section-sm section-bg">
      <div className="container">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <span className="flex items-center justify-center w-12 h-12 mb-4 text-white rounded-full bg-ember-600">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="mb-2 font-sans text-base font-semibold text-charcoal-900">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal-500">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
