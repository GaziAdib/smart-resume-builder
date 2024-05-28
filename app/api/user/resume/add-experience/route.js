import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

    const session = await getServerSession(authOptions);
  
    const {  jobTitle, companyName, jobResposibilities, description,  startDate,  endDate }  =  await req.json();

    
    try {
        if (session?.user?.role === 'USER') {

            const workExperience = await prisma.experience.create({
                data: {
                    jobTitle,
                    companyName,
                    jobResposibilities: jobResposibilities ? jobResposibilities : '',
                    description: description ? description : '',
                    user: {connect: {id: session?.user?.id}},
                    startDate: new Date(startDate).toISOString(),
                    endDate: endDate ? new Date(endDate).toISOString() : ''
                }
            })
            revalidatePath('/user/manage-resume');
            
            //revalidatePath('/user/add-resume');
            return NextResponse.json({ message: 'Work Experience Added Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Added Work Experience!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


