"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const fetchSkills = async () => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const skills = await prisma.skill.findMany({
                where: {
                    userId: session?.user?.id
                }
            })
            return skills
        }
    } catch (error) {
        console.log('error in fetching skills', error);
    }
    
}

export const fetchWorkExperiences = async () => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const experiences = await prisma.experience.findMany({
                where: {
                    userId: session?.user?.id
                }
            })
            return experiences
        }
    } catch (error) {
        console.log('error in fetching experiences', error);
    }
    
}



export const fetchEducationalQualifications = async () => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const educations = await prisma.educationalQualification.findMany({
                where: {
                    userId: session?.user?.id
                }
            })
            return educations
        }
    } catch (error) {
        console.log('error in fetching educations', error);
    }
    
}


export const fetchMyReferences = async () => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const references = await prisma.reference.findMany({
                where: {
                    userId: session?.user?.id
                }
            })
            return references
        }
    } catch (error) {
        console.log('error in fetching references', error);
    }
    
}