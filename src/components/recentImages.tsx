"use server";
import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AWS from "aws-sdk";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});
export const RecentImages = async () => {
  const serverSession = await getServerSession(authOptions);
  const prefix = `${serverSession?.user?.email}`;
  if (!process.env.AWS_BUCKET_NAME) {
    throw new Error("AWS_BUCKET_NAME environment variable is not set");
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Prefix: prefix,
    MaxKeys: 10,
  };

  const data = await s3.listObjectsV2(params).promise();

  const recentImages = data.Contents?.sort((a, b) => {
    const dateA = new Date(a.LastModified ?? 0).getTime();
    const dateB = new Date(b.LastModified ?? 0).getTime();
    return dateB - dateA;
  }).map((item) => ({
    url: `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${item.Key}`,
    createdAt: item.LastModified ?? new Date(),
    key: item.Key,
  }));

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Recent Images
      </h2>
      <p className="text-sm text-muted-foreground">
        Download your recent images
      </p>
      <Separator className="my-2" />

      <div className="flex h-fit max-w-full gap-4 overflow-x-auto py-2">
        {recentImages?.map((image) => (
          <div
            key={image.key}
            className="flex flex-col items-center gap-2 min-w-[200px]"
          >
            <img
              src={image.url}
              alt="recent upload"
              className="w-48 h-48 object-cover rounded-md shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
