"use client";

import Image from "next/image";
import { useRouter } from "@/navigation";
import { ChevronRight } from "lucide-react";

import { SEARCH_ENTITY_CONFIG } from "@/constants/search";
import { SearchResult } from "@/types/search";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

interface Props {
  result: SearchResult;
}

export default function SearchResultItem({ result }: Props) {
  const router = useRouter();

  const config = SEARCH_ENTITY_CONFIG[result.type];

  const { imageUrl, name, type, subtitle } = result;

  const handleClick = () => {
    router.push(config.route(result));
  };

  const isPlayer = type === "player";

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50 cursor-pointer"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
        <Image
          src={imageUrl || IMAGES.COMMON.DEFAULT}
          alt={name}
          fill
          sizes="48px"
          className={cn(isPlayer ? "object-cover" : "object-contain p-1")}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{name}</p>

        {subtitle && (
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </button>
  );
}
