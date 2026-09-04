import Image from "next/image";
import { SearchResult } from "@/types/search";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

interface Props {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
}

export default function SearchSuggestionItem({ result, onSelect }: Props) {
  const { imageUrl, name, type, subtitle } = result;

  const isPlayer = type === "player";

  return (
    <button
      type="button"
      onMouseDown={(event) => {
        event.preventDefault();
        onSelect(result);
      }}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted cursor-pointer"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted">
        <Image
          src={imageUrl || IMAGES.COMMON.DEFAULT}
          alt={name}
          fill
          sizes="40px"
          className={cn(isPlayer ? "object-cover" : "object-contain p-1")}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>

        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </button>
  );
}
