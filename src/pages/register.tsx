import axios from "axios";
import AuthShell from "components/auth/AuthShell";
import Layout from "components/common/Layout";
import Button from "components/ui/Button";
import Field, { inputClass } from "components/ui/Field";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuCircleAlert } from "react-icons/lu";
import { toast } from "react-toastify";
import foodRepo from "repositories/foodRepo";
import { Store } from "utils/Store";
import { useMounted } from "utils/useMounted";

export default function RegisterPage({ heroImage }: any) {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const mounted = useMounted();

  const [formError, setFormError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (mounted && state.userInfo) router.replace("/");
  }, [mounted, state.userInfo, router]);

  const onSubmit = async ({ name, email, password }: any) => {
    setFormError(null);
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data), { expires: 30, sameSite: "lax" });
      toast.success(`Welcome, ${data.name}.`);
      router.push((redirect as string) || "/");
    } catch (error: any) {
      setFormError(
        error?.response?.status === 409 || error?.response?.status === 422
          ? "An account already exists with that email address."
          : "We couldn't create your account just now. Please try again.",
      );
    }
  };

  return (
    <Layout title="Create an account" description="Create a Cheesy_Kitchen account.">
      <AuthShell
        image={heroImage}
        title="Create an account"
        subtitle="It takes about thirty seconds and saves you typing your address every time."
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="link">
              Sign in
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {formError && (
            <p className="mb-5 alert alert-danger" role="alert">
              <LuCircleAlert className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{formError}</span>
            </p>
          )}

          <Field label="Full name" error={errors.name?.message as string} required>
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

          <Field label="Email address" error={errors.email?.message as string} required>
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

          <Field
            label="Password"
            error={errors.password?.message as string}
            hint="At least 6 characters."
            required
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
                  required: "Please choose a password.",
                  minLength: {
                    value: 6,
                    message: "Passwords need to be at least 6 characters.",
                  },
                })}
              />
            )}
          </Field>

          <Field
            label="Confirm password"
            error={errors.confirmPassword?.message as string}
            required
          >
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="password"
                autoComplete="new-password"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("confirmPassword", {
                  required: "Please confirm your password.",
                  // Validated in the field rather than via a modal after
                  // submission, which is what the old page did.
                  validate: (value) =>
                    value === watch("password") || "The two passwords don't match.",
                })}
              />
            )}
          </Field>

          <Button type="submit" variant="order" size="lg" block loading={isSubmitting}>
            Create account
          </Button>
        </form>
      </AuthShell>
    </Layout>
  );
}

export async function getServerSideProps() {
  const foods = await foodRepo.listAll();
  return { props: { heroImage: foods[1]?.image ?? foods[0]?.image ?? null } };
}
