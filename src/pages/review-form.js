import axios from "axios";
import Layout from "components/common/Layout";
import Button from "components/ui/Button";
import Field, { inputClass } from "components/ui/Field";
import PageHeader from "components/ui/PageHeader";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCheckCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { Store } from "utils/Store";
import { useMounted } from "utils/useMounted";

/**
 * Leave a review.
 *
 * The old page called `router.push` inside an effect declared above the
 * `useRouter()` call that created `router`, so a signed-out visitor hit a
 * ReferenceError instead of being redirected. On success it dispatched
 * `USER_LOGIN` with the review response as the payload, which overwrote the
 * signed-in user object with a review record.
 *
 * It also exposed name, email and an image-URL field as editable inputs
 * prefilled from the account, letting anyone submit a review under any name.
 * Those now come from the session and aren't part of the form.
 */
export default function ReviewFormPage() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const mounted = useMounted();
  const [sent, setSent] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (mounted && !userInfo) router.replace("/login?redirect=/review-form");
  }, [mounted, userInfo, router]);

  const onSubmit = async ({ description }) => {
    try {
      await axios.post("/api/review", {
        name: userInfo.name,
        email: userInfo.email,
        img: userInfo.img,
        description,
      });
      setSent(true);
      reset();
      toast.success("Thanks — your review is with the kitchen.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "We couldn't post that review. Please try again.",
      );
    }
  };

  return (
    <Layout title="Leave a review">
      <PageHeader
        eyebrow="Your account"
        title="Leave a review"
        description="Tell us what you thought — good or bad, it goes straight to the people who cooked it."
        crumbs={[{ label: "Leave a review" }]}
      />

      <div className="section">
        <div className="container">
          <div className="max-w-2xl">
            {!mounted || !userInfo ? (
              <div className="h-80 skeleton rounded-card" aria-hidden="true" />
            ) : (
            <>
            {sent && (
              <p className="mb-8 alert alert-success" role="status">
                <BiCheckCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>
                  Review posted. Thanks for taking the time — it genuinely helps.
                </span>
              </p>
            )}

            <p className="mb-6 text-sm text-charcoal-500">
              Posting as <strong className="text-charcoal-800">{userInfo.name}</strong>.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Field
                label="Your review"
                error={errors.description?.message}
                hint="What did you order, and how was it?"
                required
              >
                {(id, describedBy, invalid) => (
                  <textarea
                    id={id}
                    rows={7}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    className={inputClass(invalid, "textarea")}
                    {...register("description", {
                      required: "Please write your review.",
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
                Post review
              </Button>
            </form>
            </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
