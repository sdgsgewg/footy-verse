import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  title: string;
  image: string;
  summary?: React.ReactNode;
  children: React.ReactNode;
}

const DetailPageLayout = ({ title, image, summary, children }: Props) => {
  const router = useRouter();
  const tCommon = useTranslations("common.actions");

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-border/40">
        <button
          className="bg-primary flex items-center gap-1 text-primary-foreground px-4 py-1 rounded-lg hover:bg-primary/80 cursor-pointer"
          onClick={handleNavigateBack}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tCommon("back")}</span>
        </button>

        {/* Icon and Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
            {title}
          </h1>
        </div>
      </div>

      {/* Entity Image and summary */}
      <div className="flex gap-8">
        <div
          className="flex overflow-hidden"
          // style={{ width: "100%", height: "350px" }}
        >
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-contain"
            width={180}
            height={180}
          />
        </div>

        <div className="flex-1">{summary}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">{children}</div>

      {/* Back to Previous Page */}
      {/* <div className="max-w-xl mx-auto flex items-center justify-center ">
        <button
          className="bg-primary text-primary-foreground px-8 py-2 rounded-xl hover:bg-primary/80 cursor-pointer"
          onClick={handleNavigateBack}
        >
          Back
        </button>
      </div> */}
    </div>
  );
};

export default DetailPageLayout;
