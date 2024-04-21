import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

    const session = await getServerSession(authOptions);

    const {  name, proficiency, experience }  =  await req.json();

    
    try {
        if (session?.user?.role === 'USER') {

            const skill = await prisma.skill.create({
                data: {
                    name,
                    proficiency: proficiency ? proficiency : '',
                    experience: experience ? experience : '',
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/add-resume')

            return NextResponse.json({ message: 'Skills Added Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Added Skills!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


