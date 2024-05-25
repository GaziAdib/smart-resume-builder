import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

    const session = await getServerSession(authOptions);

    const {  programmingLanguages, frameworks, tools, platforms, softSkills }  =  await req.json();

    try {
        if (session?.user?.role === 'USER') {

            const skill = await prisma.developerSkill.create({
                data: {
                    programmingLanguages,
                    frameworks,
                    tools,
                    platforms,
                    softSkills,
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/add-resume')

            return NextResponse.json({ message: 'Developer Skills Added Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Added Developer Skills!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


