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

export default function LoginPage({ heroImage }: any) {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const mounted = useMounted();

  const [formError, setFormError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (mounted && state.userInfo) router.replace("/");
  }, [mounted, state.userInfo, router]);

  const onSubmit = async ({ email, password }: any) => {
    setFormError(null);
    try {
      const { data } = await axios.post("/api/users/login", { email, password });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data), { expires: 30, sameSite: "lax" });
      toast.success(`Welcome back, ${data.name}.`);
      router.push((redirect as string) || "/");
    } catch (error: any) {
      // The old handler showed "Your email or password is not valid" for every
      // failure, including network errors, and did so via a modal that had to
      // be dismissed before you could correct the field.
      setFormError(
        error?.response?.status === 401
          ? "That email and password don't match an account."
          : "We couldn't sign you in just now. Please try again.",
      );
    }
  };

  return (
    <Layout title="Sign in" description="Sign in to your Cheesy_Kitchen account.">
      <AuthShell
        image={heroImage}
        title="Welcome back"
        subtitle="Sign in and your delivery details are already filled in."
        footer={
          <>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="link">
              Create one
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

          <Field label="Password" error={errors.password?.message as string} required>
            {(id, describedBy, invalid) => (
              <input
                id={id}
                type="password"
                autoComplete="current-password"
                aria-describedby={describedBy}
                aria-invalid={invalid}
                className={inputClass(invalid)}
                {...register("password", {
                  required: "Please enter your password.",
                  minLength: {
                    value: 6,
                    message: "Passwords are at least 6 characters.",
                  },
                })}
              />
            )}
          </Field>

          <Button type="submit" variant="order" size="lg" block loading={isSubmitting}>
            Sign in
          </Button>
        </form>

        {/* The demo credentials were already published on this page; they're
            kept, but presented as the development aid they are rather than as
            a bulleted list styled like account settings. */}
        <div className="p-4 mt-8 text-sm rounded-panel bg-oat-200 text-espresso-600">
          <p className="mb-2 font-semibold text-espresso-800">Demo accounts</p>
          <p>
            Admin — <span className="tabular-nums">admin@gmail.com</span> / 123456
          </p>
          <p>
            Customer — <span className="tabular-nums">user@gmail.com</span> / 123456
          </p>
        </div>
      </AuthShell>
    </Layout>
  );
}

export async function getServerSideProps() {
  const foods = await foodRepo.listAll();
  return { props: { heroImage: foods[0]?.image ?? null } };
}
