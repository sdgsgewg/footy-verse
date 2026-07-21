"use client";

import { ArrowLeft, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function CrudPageHeader({
  title,
  showBackButton = false,
  onBack,
}: Props) {
  const router = useRouter();
  const tCommon = useTranslations("common.actions");

  const hasBackButton = showBackButton || !!onBack;

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  };

  return (
    <PageHeader
      title={title}
      icon={
        !hasBackButton ? (
          <Database className="w-6 h-6 text-primary" />
        ) : undefined
      }
      leftAction={
        hasBackButton ? (
          <Button className="flex items-center gap-1" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
            <span>{tCommon("back")}</span>
          </Button>
        ) : undefined
      }
    />
  );
}
