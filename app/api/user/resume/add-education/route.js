import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, {params}) {

    const session = await getServerSession(authOptions);

    const {  subject, institution, degree, GPA, startDate,  endDate }  =  await req.json();

    try {
        if (session?.user?.role === 'USER') {

            const education = await prisma.educationalQualification.create({
                data: {
                    subject,
                    institution,
                    degree: degree ? degree : '',
                    GPA: GPA ? parseFloat(GPA) : null,
                    user: {connect: {id: session?.user?.id}},
                    startDate: new Date(startDate).toISOString(),
                    endDate:  new Date(endDate).toISOString(),
                }
            })

            revalidatePath('/user/add-resume')
            return NextResponse.json({ message: 'Education Added Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Add Education Qualifications!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


