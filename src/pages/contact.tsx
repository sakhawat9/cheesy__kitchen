import axios from "axios";
import Layout from "components/common/Layout";
import Button from "components/ui/Button";
import Field, { inputClass } from "components/ui/Field";
import PageHeader from "components/ui/PageHeader";
import SectionHeading from "components/ui/SectionHeading";
import { useForm } from "react-hook-form";
import { BiCheckCircle } from "react-icons/bi";
import { MdOutlineEmail, MdOutlinePlace, MdOutlineSchedule } from "react-icons/md";
import { toast } from "react-toastify";
import { useState } from "react";

const HOURS = [
  { days: "Monday – Saturday", time: "8:00 AM – 11:00 PM" },
  { days: "Sunday", time: "11:00 AM – 3:00 PM" },
];

export default function ContactPage() {
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
      // The old page imported animate.css purely to zoom a toast in, and
      // mounted its own <ToastContainer> alongside the one in _app.
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
      title="Contact"
      description="Get in touch with Cheesy_Kitchen — opening hours, delivery area and a direct line to the kitchen."
    >
      <PageHeader
        eyebrow="Say hello"
        title="Get in touch"
        description="Questions about an order, an allergy, or a large booking? The fastest answers come from the kitchen itself."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <h2 className="mb-2 text-h3">Send us a message</h2>
              <p className="mb-8 text-charcoal-500">
                We read everything that comes through here and usually reply the
                same day.
              </p>

              {sent && (
                <p className="mb-6 alert alert-success" role="status">
                  <BiCheckCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
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

                  <Field
                    label="Phone"
                    hint="Optional"
                    error={errors.phone?.message as string}
                  >
                    {(id, describedBy, invalid) => (
                      <input
                        id={id}
                        type="tel"
                        autoComplete="tel"
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        className={inputClass(invalid)}
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
                      rows={6}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={inputClass(invalid, "textarea")}
                      {...register("message", {
                        required: "Please write us a message.",
                        // The old form demanded a 50-character minimum, which
                        // rejected perfectly reasonable one-line questions.
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

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  loading={isSubmitting}
                >
                  Send message
                </Button>
              </form>
            </div>

            {/* Details */}
            <aside className="lg:col-span-5">
              <div className="card card-pad">
                <h2 className="mb-6 text-h4">Find us</h2>

                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="flex items-center justify-center rounded-full shrink-0 w-11 h-11 bg-ember-100 text-ember-700">
                      <MdOutlinePlace className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="mb-1 font-sans text-base font-semibold">
                        The kitchen
                      </h3>
                      <address className="text-sm not-italic leading-relaxed text-charcoal-500">
                        15/e Lake Circus, Kalabagan
                        <br />
                        Dhaka, Bangladesh
                      </address>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span className="flex items-center justify-center rounded-full shrink-0 w-11 h-11 bg-ember-100 text-ember-700">
                      <MdOutlineEmail className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="mb-1 font-sans text-base font-semibold">Email</h3>
                      <a
                        href="mailto:sakhawathossain7969@gmail.com"
                        className="text-sm break-all link"
                      >
                        sakhawathossain7969@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4" id="hours">
                    <span className="flex items-center justify-center rounded-full shrink-0 w-11 h-11 bg-ember-100 text-ember-700">
                      <MdOutlineSchedule className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="mb-2 font-sans text-base font-semibold">
                        Opening hours
                      </h3>
                      <dl className="space-y-1.5 text-sm">
                        {HOURS.map((entry) => (
                          <div key={entry.days} className="flex justify-between gap-4">
                            <dt className="text-charcoal-500">{entry.days}</dt>
                            <dd className="font-medium text-charcoal-800 whitespace-nowrap">
                              {entry.time}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 card card-pad bg-cream-50">
                <h3 className="mb-2 font-sans text-base font-semibold">Delivery</h3>
                <p className="text-sm leading-relaxed text-charcoal-500">
                  We deliver across Dhaka, free on every order with no minimum
                  spend. Everything is cooked to order, so allow a little longer
                  at peak times.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
