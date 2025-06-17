import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
export const Hero2 = () => {
  return (
    <div>
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - tilted left */}
          <Card className="rounded-2xl shadow-md border border-gray-400 overflow-hidden transform -rotate-3">
            <CardContent className="p-2">
              <Image
                src="/test.jpg"
                alt="Example 1"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </CardContent>
          </Card>

          {/* Card 2 - straight */}
          <Card className="rounded-2xl shadow-md border border-gray-400 overflow-hidden">
            <CardContent className="p-2">
              <Image
                src="/test.jpg"
                alt="Example 2"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </CardContent>
          </Card>

          {/* Card 3 - tilted right */}
          <Card className="rounded-2xl shadow-md border border-gray-400 overflow-hidden transform rotate-3">
            <CardContent className="p-2">
              <Image
                src="/test.jpg"
                alt="Example 3"
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
