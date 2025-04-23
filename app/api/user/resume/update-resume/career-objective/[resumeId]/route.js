import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const resumeId = params?.resumeId || '';

    const session = await getServerSession(authOptions);

    const {  careerObjective }  =  await req.json();
   

    try {
        if (session?.user?.role === 'USER') {

           // Retrieve the resume from the database
                const resume = await prisma.resume.findFirst({
                where: {
                    id: resumeId,
                },
                });

            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
                }
            
           // Update the interest in the interests array


      
          // Update the resume with the new interests array
          const updatedResume = await prisma.resume.update({
            where: {
              id: resumeId,
            },
            data: {
              careerObjective: careerObjective
            },
          });

            //revalidatePath('/user/resume')
            revalidatePath('/user/resume/developer');
            //revalidatePath('/user/resume/regular');
            
      
            return NextResponse.json({ message: 'Career Objective Updated Successfully!', careerObjective: updatedResume?.careerObjective  }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Update Career Objective!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


