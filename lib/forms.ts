/**
 * Enquiry form model + submission.
 *
 * No backend is bundled. Set NEXT_PUBLIC_FSP_FORM_ENDPOINT to any endpoint
 * that accepts a JSON POST (CRM webhook, form service, serverless function).
 */
import { site } from "@/data/site";

export const experienceLevels = [
  "Aspiring Trainer",
  "New Trainer",
  "Experienced Trainer",
  "Corporate Trainer",
  "HR / L&D Professional",
  "Facilitator",
  "Other",
] as const;

export const lookingForOptions = [
  "FSP Core Program",
  "30 Days Challenge",
  "FSP TTX",
  "FSP GTX",
  "FSP Community",
  "Masterclasses & Mastermind",
  "Catalyst Connect / Experiences",
  "Something else",
] as const;

export type EnquiryIntent = "join" | "talk";

export type Enquiry = {
  intent: EnquiryIntent;
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  experienceLevel: string;
  lookingFor: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(data: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  const digits = data.phone.replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 15) errors.phone = "Please enter a valid phone number.";
  if (!data.experienceLevel) errors.experienceLevel = "Please choose your experience level.";
  if (!data.lookingFor) errors.lookingFor = "Please tell us what you are looking for.";
  return errors;
}

export type SubmitResult = { ok: true } | { ok: false; reason: "not-configured" | "network" | "server" };

export async function submitEnquiry(data: Enquiry): Promise<SubmitResult> {
  const endpoint = site.formEndpoint;
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[FSP] NEXT_PUBLIC_FSP_FORM_ENDPOINT is not set. Enquiry payload:", data);
    }
    return { ok: false, reason: "not-configured" };
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, source: "fsp-website", submittedAt: new Date().toISOString() }),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "server" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
