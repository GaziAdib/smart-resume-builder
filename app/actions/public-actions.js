"use server";

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const verifyUserId = async (userId) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        return user
    } catch (error) {
        console.log('error in fetching Current user', error);
    }
    
}




export const fetchPublicCurrentUser = async (userId) => {
    try {
        
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        return user
       
    } catch (error) {
        console.log('error in fetching Current user', error);
    }
    
}


export const fetchAllResumes = async () => {
    const session = await getServerSession(authOptions);
    try {
        if(session?.user?.role ==='USER') {
            const resumes = await prisma.resume.findMany({
                where: {
                    userId: session?.user?.id
                }
            })
            return resumes
        }
    } catch (error) {
        console.log('error in fetching Resumes', error);
    }
    
}

export const fetchPublicResume = async (userId) => {
   
    try {
       
        const resume = await prisma.resume.findFirst({
            where: {
                userId: userId
            }
        })
        return resume
       
    } catch (error) {
        console.log('error in fetching Resume Info', error);
    }
    
}

export const fetchPublicSkills = async (userId) => {
   
    try {
        
        const skills = await prisma.skill.findMany({
            where: {
                userId: userId
            }
        })
        return skills
       
    } catch (error) {
        console.log('error in fetching skills', error);
    }
    
}

export const fetchPublicWorkExperiences = async (userId) => {
    
    try {
        
            const experiences = await prisma.experience.findMany({
                where: {
                    userId: userId
                }
            })
            return experiences
       
    } catch (error) {
        console.log('error in fetching experiences', error);
    }
    
}


export const fetchEducationalPublicQualifications = async (userId) => {
   
    try {
       
            const educations = await prisma.educationalQualification.findMany({
                where: {
                    userId: userId
                }
            })
            return educations
        
    } catch (error) {
        console.log('error in fetching educations', error);
    }
    
}


export const fetchMyPublicReferences = async (userId) => {
    try {
       
            const references = await prisma.reference.findMany({
                where: {
                    userId: userId
                }
            })
            return references
       
    } catch (error) {
        console.log('error in fetching references', error);
    }
    
}

export const fetchMyPublicProjects = async (userId) => {
  
    try {
        
        const projects = await prisma.project.findMany({
            where: {
                userId: userId
            }
        })
        return projects
     
    } catch (error) {
        console.log('error in fetching Projects', error);
    }
    
}

export const fetchMyPublicCertificates = async (userId) => {
    
    try {
      
        const certificates = await prisma.certificate.findMany({
            where: {
                userId: userId
            }
        })
        return certificates
       
    } catch (error) {
        console.log('error in fetching Certificates', error);
    }
    
}

export const fetchMyPublicDevSkills = async (userId) => {
   
    try {
        
        const devSkills = await prisma.developerSkill.findMany({
            where: {
                userId: userId
            }
        })
        return devSkills
      
    } catch (error) {
        console.log('error in fetching dev skills', error);
    }
    
}

export const fetchPublicSetting = async (userId) => {
    
    try {
       
        const setting = await prisma.setting.findFirst({
            where: {
                userId: userId
            }
        })
        return setting
        
    } catch (error) {
        console.log('error in fetching settgins', error);
    }
    
}
