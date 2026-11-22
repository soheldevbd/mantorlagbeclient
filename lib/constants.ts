export const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Programming", "IELTS", "ICT", "Statistics", "Accounting"];
export const LEVELS = ["Class 6-8", "SSC", "HSC", "Admission", "University", "Professional"];
export const MODES = ["Online", "Offline"];
export const money = (n: number) => `৳${n.toLocaleString("en-US")}`;
export const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
