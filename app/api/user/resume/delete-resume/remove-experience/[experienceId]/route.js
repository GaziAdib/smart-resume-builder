import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, {params}) {

    const experienceId = params?.experienceId || '';

    const session = await getServerSession(authOptions);

    
    try {
        if (session?.user?.role === 'USER') {

        await prisma.experience.delete({
            where:{
                id: experienceId,
                userId: session?.user?.id
            }
        })
               
        revalidatePath('/user/manage-resume');

        return NextResponse.json({ message: 'Experience Deleted Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Delete Experience Section!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


