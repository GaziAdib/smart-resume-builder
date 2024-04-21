import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {

    const session = await getServerSession(authOptions);

    const { name, company, position, phone, email, address, relationship  }  =  await req.json();
    
    try {
        if (session?.user?.role === 'USER') {

            const myReference = await prisma.reference.create({
                data: {
                    name,
                    position,
                    company: company ? company : '',
                    phone,
                    email,
                    address,
                    relationship: relationship ? relationship : '',
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/add-resume')
            return NextResponse.json({ message: 'My References Added Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Added References!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
