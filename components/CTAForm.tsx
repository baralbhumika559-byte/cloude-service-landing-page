"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  fullName: string;
  email: string;
  whatsapp: string;
  business: string;
  url: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  business: "",
  url: "",
  note: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts numbers like +977 98XXXXXXXX, spaces, dashes, parentheses — just needs 7+ digits.
const phonePattern = /^[+()\d][\d\s\-()]{6,}$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.whatsapp.trim()) {
    errors.whatsapp = "Please enter your WhatsApp number.";
  } else if (!phonePattern.test(values.whatsapp.trim())) {
    errors.whatsapp = "Please enter a valid phone number.";
  }

  if (!values.business.trim()) {
    errors.business = "Please enter your business name.";
  }

  return errors;
}

export default function CTAForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    // No backend yet: simulate a submission, then redirect.
    // Swap this block for a real API call / CRM webhook when ready.
    await new Promise((resolve) => setTimeout(resolve, 700));

    try {
      sessionStorage.setItem("bd_lead_name", values.fullName.trim());
    } catch {
      // sessionStorage can be unavailable (e.g. private mode) — non-blocking.
    }

    router.push("/thank-you");
  }

  return (
    <section id="book" className="py-14 sm:py-20">
      <div className="container-narrow px-5 sm:px-6">
        <div className="rounded-xl2 border border-brand-line bg-brand-bg-raised px-6 py-8 sm:px-10 sm:py-10 shadow-premium text-center">
          <h2 className="font-display font-bold text-brand-ink text-2xl sm:text-3xl">
            Book the Call
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-brand-line bg-brand-bg px-3.5 py-1.5 text-xs font-semibold text-brand-ink-soft">
              One-to-one consultation
            </span>
            <span className="rounded-full border border-brand-line bg-brand-bg px-3.5 py-1.5 text-xs font-semibold text-brand-ink-soft">
              Customized strategy for your business
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 space-y-4 text-left"
          >
            <Field
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="e.g. Priya Sharma"
              required
              value={values.fullName}
              error={errors.fullName}
              onChange={handleChange}
              autoComplete="name"
            />

            <Field
              label="Active Email"
              name="email"
              type="email"
              placeholder="you@business.com"
              required
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              autoComplete="email"
            />

            <Field
              label="WhatsApp Number"
              name="whatsapp"
              type="tel"
              placeholder="e.g. +977 98XXXXXXXX"
              required
              value={values.whatsapp}
              error={errors.whatsapp}
              onChange={handleChange}
              autoComplete="tel"
            />

            <Field
              label="Business Name"
              name="business"
              type="text"
              placeholder="Your business name"
              required
              value={values.business}
              error={errors.business}
              onChange={handleChange}
            />

            <Field
              label="Website or Facebook URL"
              name="url"
              type="text"
              placeholder="facebook.com/yourbusiness (optional)"
              value={values.url}
              error={errors.url}
              onChange={handleChange}
            />

            <div>
              <label
                htmlFor="note"
                className="mb-1.5 block text-sm font-semibold text-brand-ink"
              >
                Anything You Want to Say
              </label>
              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="Tell us a bit about your business or what you're struggling with (optional)"
                value={values.note}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-line bg-brand-bg px-4 py-3.5 text-base text-brand-ink placeholder:text-brand-ink-faint focus:border-brand-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-xl bg-brand-primary px-8 py-4 text-base font-semibold text-white shadow-premium transition-transform duration-150 hover:-translate-y-0.5 hover:bg-brand-primary-dark active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Booking your call…" : "Book Free Consultation"}
            </button>

            <p className="text-center text-xs text-brand-ink-faint">
              We respect your privacy. No spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
  value,
  error,
  onChange,
  autoComplete,
}: {
  label: string;
  name: keyof FormState;
  type: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-brand-ink"
      >
        {label} {required && <span className="text-brand-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-xl border bg-brand-bg px-4 py-3.5 text-base text-brand-ink placeholder:text-brand-ink-faint focus:outline-none ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-brand-line focus:border-brand-primary"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
