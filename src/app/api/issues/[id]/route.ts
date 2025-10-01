import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import z from "zod";

const updateStatusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});


export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = updateStatusSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    const id = parseInt(params.id); //this comes from the URL (/api/issues/:id)

    const updatedIssue = await prisma.issue.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error: any) {
    console.error("Error in PATCH", error);
    return NextResponse.json(
      { error: "Failed to update issue" },
      { status: 500 }
    );
  }
}
