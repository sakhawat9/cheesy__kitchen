import axios from "axios";
import Layout from "components/common/Layout";
import Button from "components/ui/Button";
import Field, { inputClass } from "components/ui/Field";
import PageMasthead from "components/ui/PageMasthead";
import Reveal from "components/ui/Reveal";
import SectionIntro from "components/ui/SectionIntro";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCheck, LuClock, LuMail, LuMapPin, LuUtensils } from "react-icons/lu";
import { toast } from "react-toastify";
import foodRepo from "repositories/foodRepo";

const HOURS = [
  { days: "Monday – Saturday", time: "8:00 AM – 11:00 PM" },
  { days: "Sunday", time: "11:00 AM – 3:00 PM" },
];

export default function ContactPage({ heroImage }: any) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values: any) {
    try {
      await axios.post("/api/contact", values, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Thanks — your message is on its way to the kitchen.");
      setSent(true);
      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "We couldn't send that just now. Please try again, or email us directly.",
      );
    }
  }

  return (
    <Layout
      heroPage
      title="Visit"
      description="Find Cheesy Kitchen — opening hours, our address in Kalabagan, and a direct line to the kitchen."
    >
      <PageMasthead
        label="Come and eat"
        title="Visit the kitchen"
        description="Walk in, book a table, or ask us anything — questions about an order, an allergy, or a large booking."
        crumbs={[{ label: "Visit" }]}
        image={heroImage}
      />

      {/* Details first: most people arriving here want the address and the
          hours, not a form. */}
      <section className="section-sm surface-cream">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal className="p-8 rounded-panel bg-espresso-900 on-dark">
              <LuMapPin className="w-6 h-6 mb-5 text-saffron-400" aria-hidden="true" />
              <h2 className="mb-3 text-2xl text-oat-50">Where we are</h2>
              <address className="not-italic leading-relaxed text-oat-400">
                15/e Lake Circus, Kalabagan
                <br />
                Dhaka, Bangladesh
              </address>
            </Reveal>

            <Reveal delay={100} className="p-8 rounded-panel bg-oat-200" id="hours">
              <LuClock className="w-6 h-6 mb-5 text-chilli-600" aria-hidden="true" />
              <h2 className="mb-4 text-2xl">Kitchen hours</h2>
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
              <LuMail className="w-6 h-6 mb-5 text-chilli-600" aria-hidden="true" />
              <h2 className="mb-4 text-2xl">Email us</h2>
              <p className="mb-3 text-sm text-espresso-500">
                We read everything and usually reply the same day.
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
      </section>

      {/* The form */}
      <section className="section surface-cream">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionIntro
                label="Say hello"
                title="Send us a message"
                description="Booking for a group, an allergy we should know about, or something that went wrong with an order — this reaches the kitchen directly."
              />

              <Reveal
                delay={140}
                className="flex gap-4 p-6 mt-10 rounded-panel bg-oat-200"
              >
                <LuUtensils
                  className="w-5 h-5 mt-1 shrink-0 text-saffron-600"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-espresso-600">
                  Placing an order? You don&apos;t need this form —{" "}
                  <Link href="/foods" className="link">
                    order from the menu
                  </Link>{" "}
                  and it goes straight to the pass.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              {sent && (
                <p className="mb-8 alert alert-success" role="status">
                  <LuCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>
                    Message sent. We&apos;ll get back to you at the email address
                    you gave us.
                  </span>
                </p>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    error={errors.name?.message as string}
                    required
                  >
                    {(id, describedBy, invalid) => (
                      <input
                        id={id}
                        type="text"
                        autoComplete="name"
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        className={inputClass(invalid)}
                        {...register("name", { required: "Please tell us your name." })}
                      />
                    )}
                  </Field>

                  <Field label="Phone" hint="Optional">
                    {(id, describedBy) => (
                      <input
                        id={id}
                        type="tel"
                        autoComplete="tel"
                        aria-describedby={describedBy}
                        className="input"
                        {...register("phone")}
                      />
                    )}
                  </Field>
                </div>

                <Field
                  label="Email address"
                  error={errors.email?.message as string}
                  required
                >
                  {(id, describedBy, invalid) => (
                    <input
                      id={id}
                      type="email"
                      autoComplete="email"
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={inputClass(invalid)}
                      {...register("email", {
                        required: "We need an email address to reply to.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "That doesn't look like a valid email address.",
                        },
                      })}
                    />
                  )}
                </Field>

                <Field
                  label="Message"
                  error={errors.message?.message as string}
                  hint="A sentence or two is plenty."
                  required
                >
                  {(id, describedBy, invalid) => (
                    <textarea
                      id={id}
                      rows={7}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={inputClass(invalid, "textarea")}
                      {...register("message", {
                        required: "Please write us a message.",
                        minLength: {
                          value: 10,
                          message: "Could you give us a little more detail?",
                        },
                        maxLength: {
                          value: 1000,
                          message: "Please keep it under 1000 characters.",
                        },
                      })}
                    />
                  )}
                </Field>

                <Button type="submit" variant="order" size="lg" loading={isSubmitting}>
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const foods = await foodRepo.listAll();
  return { props: { heroImage: foods[3]?.image ?? foods[0]?.image ?? null } };
}
