// lib/mockData.ts

export type DocumentStatus = "draft" | "pending" | "approved" | "rejected";

export interface Document {
  id: string;
  title: string;
  content: string;
    toOrg: string;
  status: DocumentStatus;
  createdAt: string;
}

// 🔥 ตัวเดียวใช้ทั้งระบบ
export const documents: Document[] = [];