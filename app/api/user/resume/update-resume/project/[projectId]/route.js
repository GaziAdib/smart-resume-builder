import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const projectId = params?.projectId || '';


    const session = await getServerSession(authOptions);

    const {projectTitle, projectGitLink, projectLiveLink, projectAchievements, startDate, endDate }  =  await req.json();
        
    try {
        if (session?.user?.role === 'USER') {
            const updateProject = await prisma.project.update({
                where: {
                    id: projectId,
                    userId: session?.user?.id
                },
                data: {
                    projectTitle: projectTitle,
                    projectGitLink: projectGitLink,
                    projectLiveLink: projectLiveLink,
                    projectAchievements: projectAchievements,
                    startDate: startDate && new Date(startDate).toISOString(),
                    endDate:  endDate && new Date(endDate).toISOString(),
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/resume/regular');

            return NextResponse.json({ message: 'Project Updated Successfully!', data: updateProject }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Update Project Section!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


