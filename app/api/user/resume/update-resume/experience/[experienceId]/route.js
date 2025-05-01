import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const experienceId = params?.experienceId || '';

    const session = await getServerSession(authOptions);

    const { jobTitle, companyName, jobResposibilities, startDate, endDate }  =  await req.json();
        

    try {
        if (session?.user?.role === 'USER') {
            const updateExperience = await prisma.experience.update({
                where: {
                    id: experienceId,
                    userId: session?.user?.id
                },
                data: {
                    jobTitle: jobTitle,
                    companyName: companyName,
                    jobResposibilities: jobResposibilities,
                    startDate: startDate && new Date(startDate).toISOString(),
                    endDate:  endDate && new Date(endDate).toISOString(),
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/resume/regular');

            return NextResponse.json({ message: 'Work Experience Section Updated Successfully!', data: updateExperience }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Update Experience Section!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


