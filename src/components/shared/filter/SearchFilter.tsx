import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";

interface SearchFilterProps {
  value: string;
  placeholder: string;
  isSearching: boolean;
  onChange: (value: string) => void;
}

export default function SearchFilter({
  value,
  placeholder,
  isSearching,
  onChange,
}: SearchFilterProps) {
  return (
    <div className="w-full relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <Input
        type="text"
        placeholder={placeholder}
        className="pl-9 h-9"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
        </motion.div>
      )}
    </div>
  );
}
