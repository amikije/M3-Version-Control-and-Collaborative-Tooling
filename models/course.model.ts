import { Temporal } from "@js-temporal/polyfill";

export interface Course {
  id: string;
  title: string;
  capacity: number;
  startDate: Temporal.PlainDate;
}

export type CourseStatus =
  | {
      status: "DRAFT";
      createdBy: string;
      createdAt: Temporal.Instant;
    }
  | {
      status: "PUBLISHED";
      publishedAt: Temporal.Instant;
      syllabus: string;
    }
  | {
      status: "ACTIVE";
      enrolledCount: number;
      startDate: Temporal.PlainDate;
    }
  | {
      status: "ARCHIVED";
      archivedAt: Temporal.Instant;
      finalEnrollmentCount: number;
    }
  | {
      status: "CANCELLED";
      reason: string;
      cancelledAt: Temporal.Instant;
    };

export function describeCourse(
  course: CourseStatus
): string {
  switch (course.status) {
    case "DRAFT":
      return `Draft created by ${course.createdBy}`;

    case "PUBLISHED":
      return `Published with syllabus ${course.syllabus}`;

    case "ACTIVE":
      return `Active with ${course.enrolledCount} students since ${course.startDate}`;

    case "ARCHIVED":
      return `Archived with ${course.finalEnrollmentCount} students`;

    case "CANCELLED":
      return `Cancelled because ${course.reason}`;

    default: {
      const _check: never = course;
      throw new Error(
        `Unhandled course status: ${JSON.stringify(_check)}`
      );
    }
  }
}