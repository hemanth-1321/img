"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Hero2 } from "@/components/hero2";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      {/* Main Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <Badge
              variant="secondary"
              className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-full"
            >
              <span className="mr-2">New ✨</span>
              Create bold visuals with custom background text
              <ArrowRight className="ml-2 h-4 w-4" />
            </Badge>
          </div>

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 flex flex-wrap justify-center gap-3">
              <span>Design Images with</span>
              <span className="text-gray-500">Bold</span>
              <Badge
                variant="default"
                className="bg-[#DBE8E7] text-teal-500 text-5xl font-bold px-10 py-4 rounded-full"
              >
                Impact
              </Badge>
            </h1>

            <p className="text-gray-600 mb-10 max-w-3xl mx-auto text-xl font-semibold tracking-tight">
              Upload a photo and overlay powerful background text to create
              eye-catching visuals perfect for social media, campaigns, or just
              for fun.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-medium"
                onClick={() => {
                  if (!session) {
                    toast.error("unAuthorized");
                  } else {
                    router.push("/dashboard");
                  }
                }}
              >
                <Sparkles className="mr-2" />
                Upload an Image
              </Button>
            </div>

            <div className="border-t border-gray-300 mt-10 w-full"></div>

            {/* Hero Component */}
            <Hero2 />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} BoldVisuals. All rights reserved.
          </p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:underline text-sm">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
