"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Creator } from "@/components/creater";
import Image from "next/image";
import Style from "@/components/style";

export default async function page() {
  const serverSession = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: serverSession?.user?.email ?? undefined,
    },
    select: {
      credits: true,
    },
  });
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col gap-6 items-center text-center">
          {user?.credits === 0 ? (
            <div className="px-6 md:px-10">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Hi there
              </h1>
              <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Want to create a thumbnail?
              </h2>
              <p className="text-muted-foreground mt-4 leading-7">
                Buy more credits to continue generating thumbnails
              </p>
              <Link href="/dashboard/pricing">
                <Button className="mt-4">Buy credits</Button>
              </Link>
              <div className="font-bold mt-10">See recent thumbnails</div>
            </div>
          ) : (
            <div className="px-6 md:px-10">
              <div className="mt-6 w-full">
                <Creator />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
