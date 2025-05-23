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


export const fetchAllResumes = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role === 'USER') {
            const resumes = await prisma.resume.findMany({
                where: {
                    userId: userId
                }
            })
            return resumes
        }
    } catch (error) {
        console.log('error in fetching Resumes', error);
    }
    
}

export const fetchResume = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const resume = await prisma.resume.findFirst({
                where: {
                    userId: userId
                }
            })
            return resume
        }
    } catch (error) {
        console.log('error in fetching skills', error);
    }
    
}

export const fetchSkills = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const skills = await prisma.skill.findMany({
                where: {
                    userId: userId
                }
            })
            return skills
        }
    } catch (error) {
        console.log('error in fetching skills', error);
    }
    
}

export const fetchWorkExperiences = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role === 'USER') {
            const experiences = await prisma.experience.findMany({
                where: {
                    userId: userId
                }
            })
            return experiences
        }
    } catch (error) {
        console.log('error in fetching experiences', error);
    }
    
}


export const fetchEducationalQualifications = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const educations = await prisma.educationalQualification.findMany({
                where: {
                    userId: userId
                }
            })
            return educations
        }
    } catch (error) {
        console.log('error in fetching educations', error);
    }
    
}


export const fetchMyReferences = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const references = await prisma.reference.findMany({
                where: {
                    userId: userId
                }
            })
            return references
        }
    } catch (error) {
        console.log('error in fetching references', error);
    }
    
}

export const fetchMyProjects = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role === 'USER') {
            const projects = await prisma.project.findMany({
                where: {
                    userId: userId
                }
            })
            return projects
        }
    } catch (error) {
        console.log('error in fetching Projects', error);
    }
    
}

export const fetchMyCertificates = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const certificates = await prisma.certificate.findMany({
                where: {
                    userId: userId
                }
            })
            return certificates
        }
    } catch (error) {
        console.log('error in fetching Certificates', error);
    }
    
}

export const fetchMyDevSkills = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role === 'USER') {
            const devSkills = await prisma.developerSkill.findMany({
                where: {
                    userId: userId
                }
            })
            return devSkills
        }
    } catch (error) {
        console.log('error in fetching dev skills', error);
    }
    
}

export const fetchSetting = async (userId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role === 'USER') {
            const setting = await prisma.setting.findFirst({
                where: {
                    userId: userId
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
        if(session?.user?.role === 'USER') {

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

// DELETE Project by id

export const deleteProject = async (projectId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {

            const myProject = await prisma.project.findFirst({
                where: {
                    id: projectId
                }
            })
            
            if (session?.user?.id === myProject.userId) {
                await prisma.project.delete({
                    where: {
                        id: projectId
                    }
                })
            }
    
        }
    } catch (error) {
        console.log('error in Deleting Project', error);
    }
    
}

// DELETE Certificate by id

export const deleteCertificate = async (certificateId) => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {

            const myCertificate = await prisma.certificate.findFirst({
                where: {
                    id: certificateId
                }
            })
            
            if (session?.user?.id === myCertificate.userId) {
                await prisma.certificate.delete({
                    where: {
                        id: certificateId
                    }
                })
            }
    
        }
    } catch (error) {
        console.log('error in Deleting Certificate', error);
    }
    
}

