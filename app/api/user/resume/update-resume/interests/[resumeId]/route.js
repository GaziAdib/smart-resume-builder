import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const resumeId = params?.resumeId|| '';

    const session = await getServerSession(authOptions);

    const {  newInterestName, oldInterestName }  =  await req.json();
   

    try {
        if (session?.user?.role === 'USER') {

           // Retrieve the resume from the database
                const resume = await prisma.resume.findUnique({
                where: {
                    id: resumeId,
                },
                });

            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
                }
            
           // Update the interest in the interests array



           const updatedInterests = resume?.interests?.map(interest => {
            return interest === oldInterestName ? newInterestName : interest;
          });
      
          // Update the resume with the new interests array
          const updatedResume = await prisma.resume.update({
            where: {
              id: resumeId,
            },
            data: {
              interests: updatedInterests,
            },
          });

            revalidatePath('/user/resume')
      
            return NextResponse.json({ message: 'Interests Updated Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Update Interests!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


