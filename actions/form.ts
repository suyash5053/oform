"use server"

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import {formSchema, formSchemaType} from "@/schemas/form";

class UserNotFoundError extends Error {}
export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const stats =  await prisma.form.aggregate({
    where: {
        userId: user.id,
    },
    _sum: {
        visits: true,
        submissions: true,
    }
  })
  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionsRate = 0;
  if (visits > 0) {
        submissionsRate = (submissions / visits) * 100;
  }
  const bounceRate = (visits - submissions) * 100;

  return {
    visits, submissions, submissionsRate, bounceRate
  }
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Invalid form data");
  }
  const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError();
    }
  const {name,description} = data;
  const form = await prisma.form.create({
    data: {
        userId: user.id,
        name,
        description,
    }
  })
  if (!form) {
    throw new Error("Failed to create form");
  }

    return form.id;
}