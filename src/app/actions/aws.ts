"use server";
import AWS from "aws-sdk";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { format } from "date-fns";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});
export const getPreSignedUrl = async () => {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession) {
    throw new Error("User not authenticated");
  }
  const timestamp = format(new Date(), "yyyyMMddHHmmss");
  const key = `${serverSession.user?.email}/${timestamp}.png`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60,
    ContentType: "image/png",
  };

  const uploadUrl = s3.getSignedUrl("putObject", params);
  return uploadUrl;
};
