import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const educationId = params?.educationId || '';

    const session = await getServerSession(authOptions);

    const { subject, institution, degree, GPA, startDate, endDate }  =  await req.json();

    console.log('subject', subject);

    
    try {
        if (session?.user?.role === 'USER') {

            const updateEducation = await prisma.educationalQualification.update({
                where: {
                    id: educationId,
                },
                data: {
                    subject: subject,
                    institution: institution,
                    degree: degree && degree,
                    GPA: GPA && parseFloat(GPA),
                    startDate: startDate && new Date(startDate).toISOString(),
                    endDate:  endDate && new Date(endDate).toISOString(),
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/resume');

            return NextResponse.json({ message: 'Education Section Updated Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Update Education Section!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


