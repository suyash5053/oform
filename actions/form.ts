"use server"

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

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