import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {


  const resumeId = params?.resumeId || '';

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'USER') {
    return NextResponse.json({ message: 'You must be an authenticated user to update Interests!' }, { status: 403 });
  }

  const { interests } = await req.json();

  try {
    // Retrieve resume info
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId: session?.user?.id
      },
    });

    if (!resume) {
      return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
    }

    // Update the data
    const updatedResume = await prisma.resume.update({
      where: {
        id: resumeId
      },
      data: {
        interests: interests
      },
    });

    // Revalidate the path 
    revalidatePath('/user/resume/regular');

    return NextResponse.json({ message: 'Interests Updated Successfully!', interests: updatedResume.interests }, { status: 200 });
  } catch (error) {
    console.error('Error updating language proficiency:', error);
    return NextResponse.json({ error: 'Failed to update Interests' }, { status: 500 });
  }

}


