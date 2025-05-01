import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const session = await getServerSession(authOptions);

    const userId = params?.userId;

    const { website, github, linkedin, phone, profileImageUrl }  =  await req.json();

    try {
        if (session?.user?.role === 'USER') {

            const updated_profile = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    profileImageUrl: profileImageUrl ? profileImageUrl : '',
                    github: github,
                    website: website,
                    linkedin: linkedin,
                    phone: phone
                }
            })

            revalidatePath('/user/settings')
            return NextResponse.json({ message: 'User Profile Updated Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Update Profile!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
