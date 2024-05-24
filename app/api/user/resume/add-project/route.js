import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, {params}) {

    const session = await getServerSession(authOptions);

    const {  projectTitle, projectLiveLink, projectGitLink, projectAchievements, startDate, endDate }  =  await req.json();

    
    try {
        if (session?.user?.role === 'USER') {

            const project = await prisma.project.create({
                data: {
                    projectTitle,
                    projectGitLink: projectGitLink,
                    projectLiveLink: projectLiveLink,
                    projectAchievements: projectAchievements,
                    user: {connect: {id: session?.user?.id}},
                    startDate: new Date(startDate).toISOString(),
                    endDate:  new Date(endDate).toISOString(),
                }
            })

            revalidatePath('/user/add-resume')
            return NextResponse.json({ message: 'Project Added Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Add Project To Resume!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}



