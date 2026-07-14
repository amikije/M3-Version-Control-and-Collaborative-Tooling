import { Temporal } from "@js-temporal/polyfill";

import {
  AssessmentItem,
  calculateGrade
} from "./models/assessment.model";

import {
  EnrollmentStatus,
  describeEnrollment
} from "./models/enrollment.model";

import {
  CourseStatus,
  describeCourse,
  Course
} from "./models/course.model";

import {
  ApiResponse,
  renderResponse
} from "./models/api-response.model";

import { Student } from "./models/student.model";

/* Exercise 4 */

const quiz: AssessmentItem = {
  id: "QUIZ-001",
  kind: "quiz",
  title: "SQL Basics",
  correctAnswers: 8,
  totalQuestions: 10
};

const lab: AssessmentItem = {
  id: "LAB-001",
  kind: "lab",
  title: "REST API Project",
  functionalityScore: 85,
  codeQualityScore: 90
};

console.log(`Quiz Grade: ${calculateGrade(quiz)}%`);
console.log(`Lab Grade: ${calculateGrade(lab)}%`);

/* Exercise 5 */

const pending: EnrollmentStatus = {
  status: "PENDING",
  requestedAt: Temporal.Now.instant(),
  studentId: "STU-001",
  courseId: "CRS-101"
};

console.log(describeEnrollment(pending));

/* Course Lifecycle */

const webDev: CourseStatus = {
  status: "ACTIVE",
  enrolledCount: 28,
  startDate: Temporal.PlainDate.from("2026-09-01")
};

console.log(describeCourse(webDev));

/* Exercise 6 */

const studentRes: ApiResponse<Student> = {
  status: "success",
  data: {
    id: "STU-001",
    name: "Dawit Bekele",
    enrollmentDate: Temporal.Now.instant(),
    gpa: 3.4
  },
  fetchedAt: Temporal.Now.instant()
};

console.log(
  renderResponse(
    studentRes,
    (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`
  )
);

const courseRes: ApiResponse<Course[]> = {
  status: "success",
  data: [
    {
      id: "CRS-101",
      title: "Web Development Fundamentals",
      capacity: 30,
      startDate: Temporal.PlainDate.from("2026-09-01")
    }
  ],
  fetchedAt: Temporal.Now.instant()
};

console.log(
  renderResponse(
    courseRes,
    (courses) =>
      courses.map((c) => c.title).join(", ")
  )
);

/* Exercise 7 */

const approvedAt = Temporal.Now.instant();

console.log(`Approved At: ${approvedAt}`);

const addisTime =
  approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");

const londonTime =
  approvedAt.toZonedDateTimeISO("Europe/London");

console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);

const today = Temporal.Now.plainDateISO();

const courseStart =
  Temporal.PlainDate.from("2026-09-01");

const daysUntilStart =
  today.until(courseStart).total({ unit: "days" });

console.log(
  `${Math.floor(daysUntilStart)} days until course starts`
);