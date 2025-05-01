import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

    const session = await getServerSession(authOptions);

    const {  showPersonalDetailSection, showEducationSection, showWorkExperienceSection, showCareerObjective, showProfilePicture,  showReference }  =  await req.json();

    
    try {
        if (session?.user?.role === 'USER') {
            const setting = await prisma.setting.create({
                data: {
                    showEducation: showEducationSection ? showEducationSection : true,
                    showWorkExperience: showWorkExperienceSection ? showWorkExperienceSection : true,
                    showPersonalDetail: showPersonalDetailSection ? showPersonalDetailSection : false,
                    user: {connect: {id: session?.user?.id}}
                }
            })

            revalidatePath('/user/settings')
            return NextResponse.json({ message: 'New Settings Applied Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Update Settings!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
