import Link from "next/link";
import { LuClock, LuMail, LuMapPin } from "react-icons/lu";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";

const HOURS = [
  { days: "Monday – Saturday", time: "8:00 AM – 11:00 PM" },
  { days: "Sunday", time: "11:00 AM – 3:00 PM" },
];

/**
 * Where we are, when we're open, how to reach us.
 *
 * Only information already established in the project: the Kalabagan address,
 * the two sets of opening hours and the contact address. No phone number is
 * printed here — the one the old header carried, "(+1) 654 567 – 6789", was a
 * template placeholder with a US country code on a Dhaka restaurant.
 */
export default function VisitUs() {
  return (
    <section className="section surface-cream">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionIntro
              label="Come and eat"
              title="Find the kitchen"
              description="We're on Lake Circus in Kalabagan. Walk in, or have it brought to you anywhere in Dhaka."
            />

            <Reveal delay={140} className="flex flex-wrap gap-4 mt-9">
              <Link href="/contact" className="btn btn-order">
                Get in touch
              </Link>
              <Link href="/foods" className="btn btn-line">
                Order delivery
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <Reveal className="p-8 sm:col-span-2 rounded-panel bg-espresso-900 on-dark">
                <LuMapPin
                  className="w-6 h-6 mb-5 text-saffron-400"
                  aria-hidden="true"
                />
                <h3 className="mb-3 text-2xl text-oat-50">The dining room</h3>
                <address className="not-italic leading-relaxed text-oat-400">
                  15/e Lake Circus, Kalabagan
                  <br />
                  Dhaka, Bangladesh
                </address>
              </Reveal>

              <Reveal delay={100} className="p-8 rounded-panel bg-oat-200">
                <LuClock
                  className="w-6 h-6 mb-5 text-chilli-600"
                  aria-hidden="true"
                />
                <h3 className="mb-4 text-xl">Kitchen hours</h3>
                <dl className="space-y-3 text-sm">
                  {HOURS.map((entry) => (
                    <div key={entry.days}>
                      <dt className="text-espresso-500">{entry.days}</dt>
                      <dd className="font-medium text-espresso-900">{entry.time}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={180} className="p-8 rounded-panel bg-oat-200">
                <LuMail
                  className="w-6 h-6 mb-5 text-chilli-600"
                  aria-hidden="true"
                />
                <h3 className="mb-4 text-xl">Get in touch</h3>
                <p className="mb-3 text-sm text-espresso-500">
                  Questions about an order, an allergy or a large booking.
                </p>
                <a
                  href="mailto:sakhawathossain7969@gmail.com"
                  className="text-sm break-all link"
                >
                  sakhawathossain7969@gmail.com
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
