import axios from "axios";
import Layout from "components/common/Layout";
import Button from "components/ui/Button";
import Field, { inputClass } from "components/ui/Field";
import PageHeader from "components/ui/PageHeader";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Store } from "utils/Store";
import { useMounted } from "utils/useMounted";

/**
 * Account settings.
 *
 * The old page was wrapped in `dynamic(..., { ssr: false })` and ran its
 * prefill effect with an empty dependency array, so the fields were blank on
 * the first paint. Password mismatch was reported by a modal after submission;
 * it's now validated in the field. Every control had a placeholder but no
 * label.
 */
export default function ProfilePage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const mounted = useMounted();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!mounted) return;
    if (!userInfo) {
      router.replace("/login?redirect=/profile");
      return;
    }
    reset({
      name: userInfo.name ?? "",
      email: userInfo.email ?? "",
      facebook: userInfo.facebook ?? "",
      linkedIn: userInfo.linkedIn ?? "",
      twitter: userInfo.twitter ?? "",
    });
  }, [mounted, userInfo, reset, router]);

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name: values.name,
          email: values.email,
          facebook: values.facebook,
          linkedIn: values.linkedIn,
          twitter: values.twitter,
          // Only send a password when one was actually typed, so saving the
          // form without changing it doesn't reset the account's password.
          ...(values.password ? { password: values.password } : {}),
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data), { expires: 30, sameSite: "lax" });
      toast.success("Your details have been saved.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "We couldn't save those changes. Please try again.",
      );
    }
  };

  return (
    <Layout title="Account settings">
      <PageHeader
        eyebrow="Your account"
        title="Account settings"
        crumbs={[{ label: "Account settings" }]}
      />

      <div className="section">
        <div className="container">
          <div className="max-w-2xl">
            {!mounted || !userInfo ? (
              <div className="h-96 skeleton rounded-card" aria-hidden="true" />
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h2 className="mb-6 text-h3">Your details</h2>

              <Field label="Full name" error={errors.name?.message} required>
                {(id, describedBy, invalid) => (
                  <input
                    id={id}
                    type="text"
                    autoComplete="name"
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    className={inputClass(invalid)}
                    {...register("name", { required: "Please enter your name." })}
                  />
                )}
              </Field>

              <Field label="Email address" error={errors.email?.message} required>
                {(id, describedBy, invalid) => (
                  <input
                    id={id}
                    type="email"
                    autoComplete="email"
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    className={inputClass(invalid)}
                    {...register("email", {
                      required: "Please enter your email address.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "That doesn't look like a valid email address.",
                      },
                    })}
                  />
                )}
              </Field>

              <h2 className="pt-6 mt-10 mb-2 border-t text-h3 border-cream-300">
                Change password
              </h2>
              <p className="mb-6 text-sm text-charcoal-500">
                Leave these blank to keep your current password.
              </p>

              <Field
                label="New password"
                error={errors.password?.message}
                hint="At least 6 characters."
              >
                {(id, describedBy, invalid) => (
                  <input
                    id={id}
                    type="password"
                    autoComplete="new-password"
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    className={inputClass(invalid)}
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "Passwords need to be at least 6 characters.",
                      },
                    })}
                  />
                )}
              </Field>

              <Field label="Confirm new password" error={errors.confirmPassword?.message}>
                {(id, describedBy, invalid) => (
                  <input
                    id={id}
                    type="password"
                    autoComplete="new-password"
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    className={inputClass(invalid)}
                    {...register("confirmPassword", {
                      validate: (value) =>
                        !watch("password") ||
                        value === watch("password") ||
                        "The two passwords don't match.",
                    })}
                  />
                )}
              </Field>

              <h2 className="pt-6 mt-10 mb-6 border-t text-h3 border-cream-300">
                Social links
              </h2>

              <Field label="Facebook" hint="Optional">
                {(id, describedBy) => (
                  <input
                    id={id}
                    type="url"
                    aria-describedby={describedBy}
                    className="input"
                    placeholder="https://facebook.com/…"
                    {...register("facebook")}
                  />
                )}
              </Field>

              <Field label="LinkedIn" hint="Optional">
                {(id, describedBy) => (
                  <input
                    id={id}
                    type="url"
                    aria-describedby={describedBy}
                    className="input"
                    placeholder="https://linkedin.com/in/…"
                    {...register("linkedIn")}
                  />
                )}
              </Field>

              <Field label="Twitter" hint="Optional">
                {(id, describedBy) => (
                  <input
                    id={id}
                    type="url"
                    aria-describedby={describedBy}
                    className="input"
                    placeholder="https://twitter.com/…"
                    {...register("twitter")}
                  />
                )}
              </Field>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                loading={isSubmitting}
                className="mt-2"
              >
                Save changes
              </Button>
            </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
