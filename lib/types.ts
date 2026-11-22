export type Tuition = {
  _id: string; title: string; subject: string; classLevel: string; mode: "Online" | "Offline"; location: string;
  monthlyFee: number; daysPerWeek: number; bannerImage: string; description: string;
  tutorName: string; tutorEmail: string; tutorImage?: string;
  approvalStatus: "pending" | "approved" | "rejected"; isActive: boolean; createdAt: string;
};
export type Application = {
  _id: string; tuitionId: string; tuitionTitle: string; subject: string; monthlyFee: number;
  tutorName?: string; tutorEmail: string; studentName: string; studentEmail: string; studentPhone: string;
  preferredSchedule: string; studentNote: string; status: "pending" | "accepted" | "rejected"; appliedAt: string;
};
export type Payment = {
  _id: string; userEmail: string; userName: string; userRole: string; planName: string; amount: number;
  currency: string; transactionId: string; stripeSessionId: string; paymentStatus: string; paidAt: string;
};
export type Me = {
  id: string; name: string; email: string; image?: string; role: "student" | "tutor" | "admin";
  phone?: string; bio?: string; plan: "free" | "pro"; createdAt: string; bookmarks: string[];
};
export type TuitionPage = { items: Tuition[]; total: number; page: number; pages: number };
