import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const refId = params?.refId || '';

    const session = await getServerSession(authOptions);

    const { name, company, position, relationship, email, phone, address }  =  await req.json();


    try {
        if (session?.user?.role === 'USER') {

            const updateReference = await prisma.reference.update({
                where: {
                    id: refId,
                },
                data: {
                    name: name && name,
                    company: company && company,
                    position: position && position,
                    relationship: relationship && relationship,
                    email: email && email,
                    phone: phone && phone,
                    address: address && address,
                    user: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/user/resume');

            return NextResponse.json({ message: 'Reference Section Updated Successfully!' }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be an Auth User to Update Reference Section!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}


