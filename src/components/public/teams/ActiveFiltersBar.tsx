// "use client";

// import { Filter } from "@/hooks/usePortfolioFilter";
// import { ProjectPlatform, ProjectRole } from "@/types/project";
// import { TechName } from "@/constants/tech-stack";
// import { X } from "lucide-react";

// interface Props {
//   filters: Filter;
//   setFilters: React.Dispatch<React.SetStateAction<Filter>>;
//   onClearAll: () => void;
//   tProjectValues: (key: string) => string;
//   tCommon: (key: string) => string;
// }

// export default function ActiveFiltersBar({
//   filters,
//   setFilters,
//   onClearAll,
//   tProjectValues,
//   tCommon,
// }: Props) {
//   const chips: {
//     label: string;
//     onRemove: () => void;
//   }[] = [];

//   // 🔍 Search
//   if (filters.search) {
//     chips.push({
//       label: `Search: ${filters.search}`,
//       onRemove: () => setFilters((prev) => ({ ...prev, search: "" })),
//     });
//   }

//   // 🎭 Role
//   if (filters.role) {
//     chips.push({
//       label: tProjectValues(`role.${filters.role}`),
//       onRemove: () => setFilters((prev) => ({ ...prev, role: undefined })),
//     });
//   }

//   // 🌐 Platform
//   if (filters.platform) {
//     chips.push({
//       label: tProjectValues(`platform.${filters.platform}`),
//       onRemove: () => setFilters((prev) => ({ ...prev, platform: undefined })),
//     });
//   }

//   // 🧩 Tech
//   filters.tech.forEach((tech) => {
//     chips.push({
//       label: tech,
//       onRemove: () =>
//         setFilters((prev) => ({
//           ...prev,
//           tech: prev.tech.filter((t) => t !== tech),
//         })),
//     });
//   });

//   // 🔽 Sort (optional)
//   if (filters.sort !== "newest") {
//     chips.push({
//       label: `${tCommon("sort.title")}: ${tCommon(`sort.${filters.sort}`)}`,
//       onRemove: () => setFilters((prev) => ({ ...prev, sort: "newest" })),
//     });
//   }

//   if (chips.length === 0) return null;

//   return (
//     <div className="flex flex-wrap items-center gap-2">
//       {chips.map((chip, i) => (
//         <span
//           key={i}
//           className="group inline-flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
//           onClick={chip.onRemove}
//         >
//           {chip.label}
//           <div className="rounded-full bg-slate-200 dark:bg-slate-700 p-0.5 group-hover:bg-slate-300 dark:group-hover:bg-slate-600 transition-colors">
//             <X className="w-3 h-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
//           </div>
//         </span>
//       ))}

//       {/* Clear all */}
//       <button
//         onClick={onClearAll}
//         className="text-xs underline ml-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
//       >
//         Clear all
//       </button>
//     </div>
//   );
// }
