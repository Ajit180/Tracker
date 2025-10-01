"use client";

import { Button } from "@/components/ui/button";
import { Issue } from "@prisma/client";
import axios from "axios";


type IssueResponse = Omit<Issue, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

interface UpdateIssueCardProps {
  issue: IssueResponse;
}


export default function UpdateIssueCard({ issue }: UpdateIssueCardProps) {
  const updateIssue = async (newStatus: "OPEN" | "IN_PROGRESS" | "CLOSED") => {
    await axios.patch(`/api/issues/${issue.id}`, { status: newStatus });
    alert(`Status updated to ${newStatus}`);
  };

  return (
    <div className="p-3 border rounded mb-2 space-y-2">
      <p className="font-bold text-gray-500">Current Status: {issue.status}</p>
      <div className="space-x-2">
        <Button onClick={() => updateIssue("OPEN")}>OPEN</Button>
        <Button onClick={() => updateIssue("IN_PROGRESS")}>IN PROGRESS</Button>
        <Button onClick={() => updateIssue("CLOSED")}>CLOSED</Button>
      </div>
    </div>
  );
}
