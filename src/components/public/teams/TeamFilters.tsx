// import { Filter } from "@/hooks/usePortfolioFilter";
// import { ArrowUpDown, Loader2, Monitor, Search, User } from "lucide-react";
// import { useTranslations } from "next-intl";
// import React from "react";
// import { Input } from "../ui/input";
// import { motion } from "framer-motion";
// import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
// import { ProjectPlatform, ProjectRole } from "@/types/project";
// import {
//   PROJECT_PLATFORM_OPTIONS,
//   PROJECT_ROLE_OPTIONS,
// } from "@/constants/project-options";
// import TechFilter from "./TechFilter";
// import { SortType } from "@/types/SortType";

// interface PortfolioFiltersProps {
//   filters: Filter;
//   setFilters: React.Dispatch<React.SetStateAction<Filter>>;
//   updateQuery: (filters: Filter) => void;
//   isSearching: boolean;
// }

// const PortfolioFilters = ({
//   filters,
//   setFilters,
//   updateQuery,
//   isSearching,
// }: PortfolioFiltersProps) => {
//   const tCommon = useTranslations("common");
//   const tProjectValues = useTranslations("project.values");

//   return (
//     <div className="flex flex-col gap-4 mb-4">
//       {/* Search */}
//       <div className="w-full relative">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <Input
//           type="text"
//           placeholder={tCommon("search.placeholder")}
//           className="pl-9 h-9"
//           value={filters.search}
//           onChange={(e) =>
//             setFilters((prev) => ({
//               ...prev,
//               search: e.target.value,
//             }))
//           }
//         />

//         {isSearching && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isSearching ? 1 : 0 }}
//             className="absolute right-3 top-1/2 -translate-y-1/2"
//           >
//             <Loader2 className="w-4 h-4 animate-spin" />
//           </motion.div>
//         )}
//       </div>

//       {/* Filter */}
//       <div className="flex flex-wrap items-center gap-2">
//         {/* Role Dropdown */}
//         <Select
//           value={filters.role ?? "all"}
//           onValueChange={(val) => {
//             const value = val === "all" ? undefined : (val as ProjectRole);
//             setFilters((prev) => {
//               const updated = { ...prev, role: value };
//               updateQuery(updated);
//               return updated;
//             });
//           }}
//         >
//           <SelectTrigger className="w-54 h-9 text-sm focus:ring-0">
//             <div className="flex items-center gap-2">
//               <User className="w-4 h-4 text-muted-foreground" />
//               <span className="truncate">
//                 {filters.role
//                   ? tProjectValues(`role.${filters.role}`)
//                   : tCommon("filter.allRoles")}
//               </span>
//             </div>
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">{tCommon("filter.allRoles")}</SelectItem>
//             {PROJECT_ROLE_OPTIONS.map((role) => (
//               <SelectItem key={role} value={role}>
//                 {tProjectValues(`role.${role}`)}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {/* Platform Dropdown */}
//         <Select
//           value={filters.platform ?? "all"}
//           onValueChange={(val) => {
//             const value = val === "all" ? undefined : (val as ProjectPlatform);
//             setFilters((prev) => {
//               const updated = { ...prev, platform: value };
//               updateQuery(updated);
//               return updated;
//             });
//           }}
//         >
//           <SelectTrigger className="w-46 h-9 text-sm focus:ring-0">
//             <div className="flex items-center gap-2">
//               <Monitor className="w-4 h-4 text-muted-foreground" />
//               <span className="truncate">
//                 {filters.platform
//                   ? tProjectValues(`platform.${filters.platform}`)
//                   : tCommon("filter.allPlatforms")}
//               </span>
//             </div>
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">
//               {tCommon("filter.allPlatforms")}
//             </SelectItem>
//             {PROJECT_PLATFORM_OPTIONS.map((platform) => (
//               <SelectItem key={platform} value={platform}>
//                 {tProjectValues(`platform.${platform}`)}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {/* Tech Stack Filter */}
//         <TechFilter
//           value={filters.tech}
//           onChange={(newTech) =>
//             setFilters((prev) => {
//               const updated = { ...prev, tech: newTech };
//               updateQuery(updated);
//               return updated;
//             })
//           }
//         />

//         {/* Sort Dropdown */}
//         <Select
//           value={filters.sort}
//           onValueChange={(val) => {
//             setFilters((prev) => {
//               const updated = { ...prev, sort: val as SortType };
//               updateQuery(updated);
//               return updated;
//             });
//           }}
//         >
//           <SelectTrigger className="w-32.5 h-9 text-sm focus:ring-0">
//             <div className="flex items-center gap-2">
//               <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
//               <span className="truncate">
//                 {tCommon(`sort.${filters.sort}`)}
//               </span>
//             </div>
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="newest">{tCommon("sort.newest")}</SelectItem>
//             <SelectItem value="oldest">{tCommon("sort.oldest")}</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// };

// export default PortfolioFilters;
