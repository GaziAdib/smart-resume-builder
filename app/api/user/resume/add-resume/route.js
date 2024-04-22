import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

    const session = await getServerSession(authOptions);

    const { careerObjective, personalDetail, interests, summary, declaration, mySignature   }  =  await req.json();
    
    try {
        if (session?.user?.role === 'USER') {

            const resume = await prisma.resume.create({
                data: {
                    profileImage: profileImage ? profileImage : '',
                    careerObjective,
                    personalDetail,
                    interests,
                    languageProficiencies,
                    summary: summary ? summary: '',
                    declaration,
                    mySignature,
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/add-resume')
            return NextResponse.json({ message: 'My Resume Added Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Add Resume!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


