import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, {params}) {

    const devSkillId = params?.devSkillId || '';

    const session = await getServerSession(authOptions);

    try {

        if (session?.user?.role === 'USER') {

        await prisma.developerSkill.delete({
            where:{
                id: devSkillId,
                userId: session?.user?.id
            }
        })
               
        revalidatePath('/user/manage-resume');

        return NextResponse.json({ message: 'Dev Skill Deleted Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Delete Dev Skill Section!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


