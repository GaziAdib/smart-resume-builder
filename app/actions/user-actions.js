"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const fetchCurrentUser = async () => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const user = await prisma.user.findFirst({
                where: {
                    id: session?.user?.id
                }
            })
            return user
        }
    } catch (error) {
        console.log('error in fetching Current user', error);
    }
    
}




export const fetchResume = async () => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const resume = await prisma.resume.findFirst({
                where: {
                    userId: session?.user?.id
                }
            })
            return resume
        }
    } catch (error) {
        console.log('error in fetching skills', error);
    }
    
}

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

export const fetchSetting = async () => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const setting = await prisma.setting.findFirst({
                where: {
                    userId: session?.user?.id
                }
            })
            return setting
        }
    } catch (error) {
        console.log('error in fetching settgins', error);
    }
    
}


// Delete Skill 

export const deleteSkill = async (skillId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {

            const mySkill = await prisma.skill.findFirst({
                where: {
                    id: skillId
                }
            })
            
            if (session?.user?.id === mySkill.userId) {
                await prisma.skill.delete({
                    where: {
                        id: skillId
                    }
                })
            }
    
        }
    } catch (error) {
        console.log('error in Deleting Skill', error);
    }
    
}


// Delete Education Info By Id

export const deleteEducation = async (educationId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {

            const myEducation = await prisma.educationalQualification.findFirst({
                where: {
                    id: educationId
                }
            })
            
            if (session?.user?.id === myEducation.userId) {
                await prisma.educationalQualification.delete({
                    where: {
                        id: educationId
                    }
                })
            }
    
        }
    } catch (error) {
        console.log('error in Deleting Education', error);
    }
    
}


// Delete work Experience by Id

export const deleteWorkExperience = async (experienceId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {

            const myExperience = await prisma.experience.findFirst({
                where: {
                    id: experienceId
                }
            })
            
            if (session?.user?.id === myExperience.userId) {
                await prisma.experience.delete({
                    where: {
                        id: experienceId
                    }
                })
            }
    
        }
    } catch (error) {
        console.log('error in Deleting Work Experience', error);
    }
    
}

// DELETE Reference

export const deleteReference = async (referenceId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {

            const myReference = await prisma.reference.findFirst({
                where: {
                    id: referenceId
                }
            })
            
            if (session?.user?.id === myReference.userId) {
                await prisma.reference.delete({
                    where: {
                        id: referenceId
                    }
                })
            }
    
        }
    } catch (error) {
        console.log('error in Deleting Work Refenrence', error);
    }
    
}


// DELETE Resume Info

export const deleteFullResumeInfo = async (resumeId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {

            const myResume = await prisma.resume.findFirst({
                where: {
                    id: resumeId
                }
            })
            
            if (session?.user?.id === myResume.userId) {
                await prisma.resume.delete({
                    where: {
                        id: resumeId
                    }
                })
            }
    
        }
    } catch (error) {
        console.log('error in Deleting Resume Info', error);
    }
    
}
