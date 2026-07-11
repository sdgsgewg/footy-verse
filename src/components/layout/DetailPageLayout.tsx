import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  title: string;
  image: string;
  children: React.ReactNode;
}

const DetailPageLayout = ({ title, image, children }: Props) => {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <div className="space-y-12">
      {/* Entity Name and Image */}
      <div className="max-w-xl mx-auto">
        <h1 className="text-5xl text-primary font-bold uppercase">{title}</h1>

        <div
          className="flex justify-center overflow-hidden my-8"
          style={{ width: "100%", height: "350px" }}
        >
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">{children}</div>

      {/* Back to Previous Page */}
      <div className="max-w-xl mx-auto flex items-center justify-center ">
        <button
          className="bg-primary text-primary-foreground px-8 py-2 rounded-xl hover:bg-primary/80 cursor-pointer"
          onClick={handleNavigateBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DetailPageLayout;
