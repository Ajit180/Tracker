import { NextRequest , NextResponse } from "next/server";
import z from "zod";
import prisma from "../../../../prisma/client";




const createIssueSchema = z.object({
    title:z.string().min(1).max(255),
    description:z.string().min(1)
})


export async function POST(request:NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json(validation.error,{status:400});
    }

    const newIssue = await prisma.issue.create({
        data:{title:body.title , description:body.description}
    })

    return NextResponse.json(newIssue, {status:201});
}


export async function GET(request:NextRequest){

      try {
        const issues = await prisma.issue.findMany({
            orderBy:{createdAt:"desc"} // newest first
        })

        return NextResponse.json(issues, { status: 200 });
        
      } catch (error:any) {
        console.error(error);
        return NextResponse.json(
          { message: "Failed to fetch issues" },
          { status: 500 }
        );
      }
}