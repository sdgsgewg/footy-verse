import { CrudPageHeader } from "@/components/templates/crud";
import { isDashboardPath } from "@/lib/utils/navigation";
import { usePathname } from "@/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  title: string;
  summary: React.ReactNode;
  content: React.ReactNode;
}

const DetailPageLayout = ({ title, summary, content }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigateBack = () => {
    router.back();
  };

  const isDashboard = isDashboardPath(pathname);

  return (
    <div className="space-y-8">
      {/* Header */}
      {isDashboard && (
        <CrudPageHeader
          title={title}
          showBackButton
          onBack={handleNavigateBack}
        />
      )}

      {/* Entity Image and summary */}
      <div className="flex gap-8">{summary}</div>

      {/* Detail Content */}
      <div className="space-y-6">{content}</div>
    </div>
  );
};

export default DetailPageLayout;
