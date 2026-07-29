import { CrudPageHeader } from "@/components/templates/crud";
import { isDashboardPath } from "@/lib/utils/navigation";
import { usePathname, useRouter } from "@/navigation";
import React from "react";

interface Props {
  title: string;
  summary: React.ReactNode;
  content: React.ReactNode;
  backHref?: string;
  onBack?: () => void;
}

const DetailPageLayout = ({
  title,
  summary,
  content,
  backHref,
  onBack,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigateBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (backHref) {
      router.push(backHref);
      return;
    }

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
      <div className="w-full">{summary}</div>

      {/* Detail Content */}
      <div className="space-y-8">{content}</div>
    </div>
  );
};

export default DetailPageLayout;
