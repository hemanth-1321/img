"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Creator } from "@/components/creater";
import { RecentImages } from "@/components/recentImages";
export default async function page() {
  const serverSession = await getServerSession(authOptions);

  // If no session, show login prompt
  if (!serverSession || !serverSession.user?.email) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Please login to continue</h1>
          <Link href="/api/auth/signin">
            <Button className="mt-4">Login</Button>
          </Link>
        </div>
      </main>
    );
  }

  // If session exists, get user from DB
  const user = await prisma.user.findUnique({
    where: {
      email: serverSession.user.email,
    },
    select: {
      credits: true,
    },
  });

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">User not found</h1>
          <p className="text-muted-foreground">
            Please make sure you are registered.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col gap-6 items-center text-center">
          {user.credits === 1 ? (
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
              <div>
                <RecentImages />
              </div>
            </div>
          ) : (
            <div className="px-6 md:px-10">
              <div className="mt-6 w-full">
                <Creator>
                  <RecentImages />
                </Creator>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
