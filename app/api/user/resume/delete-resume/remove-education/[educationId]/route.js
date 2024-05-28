import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, {params}) {

    const educationId = params?.educationId || '';

    const session = await getServerSession(authOptions);

    
    try {
        if (session?.user?.role === 'USER') {

        await prisma.educationalQualification.delete({
            where:{
                id: educationId,
                userId: session?.user?.id
            }
        })
               
        revalidatePath('/user/manage-resume');

        return NextResponse.json({ message: 'Education Deleted Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Delete Education Section!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


