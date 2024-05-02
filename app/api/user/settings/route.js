import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, {params}) {

    const session = await getServerSession(authOptions);

    const {  showPersonalDetailSection, showEducationSection, showWorkExperienceSection, showCareerObjective, showProfilePicture,  showReference }  =  await req.json();

    
    try {
        if (session?.user?.role === 'USER') {
            console.log(showEducationSection, showPersonalDetailSection, showWorkExperienceSection)

            const setting = await prisma.setting.create({
                data: {
                    showEducation: showEducationSection,
                    showWorkExperience: showWorkExperienceSection,
                    showPersonalDetail: showPersonalDetailSection,
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
