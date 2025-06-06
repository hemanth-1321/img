import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export const RecentImages = () => {
  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Recent Images
      </h2>
      <p className="text-sm text-muted-foreground">
        Download your recent images
      </p>
      <Separator className="my-2" />
      <div className="flex h-fit  max-w-full gap-2 overflow-x-scroll">
        <div className="flex min-w-fit flex-col gap-2">
          <img
            src="test.jpg"
            alt="image"
            className="h-56 w-auto rounded-lg object-contain"
          />
          <Button>Download</Button>
        </div>
        <div className="flex min-w-fit flex-col gap-2">
          <img
            src="test.jpg"
            alt="image"
            className="h-56 w-auto rounded-lg object-contain"
          />
          <Button>Download</Button>
        </div>
      </div>
    </div>
  );
};
