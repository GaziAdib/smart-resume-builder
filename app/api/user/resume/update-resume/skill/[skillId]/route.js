import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const skillId = params?.skillId || '';

    const session = await getServerSession(authOptions);

    const {  name }  =  await req.json();


    
    try {
        if (session?.user?.role === 'USER') {

            const skill = await prisma.skill.update({
                where: {
                    id: skillId,
                },
                data: {
                    name,
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/resume')

            return NextResponse.json({ message: 'Skill Updated Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Update Skills!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


