import { Temporal } from "@js-temporal/polyfill";

export interface Student {
  id: string;
  name: string;
  enrollmentDate: Temporal.Instant;
  gpa?: number;
}

export function isStudent(value: unknown): value is Student {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

export function parseStudent(data: unknown): Student {
  if (!isStudent(data)) {
    throw new Error("Invalid student data");
  }

  return data;
}