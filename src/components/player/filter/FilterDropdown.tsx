import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";

export default function FilterDropdown({
  teamType,
  teamName,
  selectedFilter,
  setSelectedFilter,
  selectedType,
  availableTypes,
}: {
  teamType: string;
  teamName: string;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  selectedType: string;
  availableTypes: string[];
}) {
  const router = useRouter();

  const teamTypeOptions = availableTypes.map((type) => ({
    value: type,
    label: type.toUpperCase(),
  }));

  const filterCallupOptions = [
    { value: "all-players", label: "All Players" },
    { value: "called-up-players", label: "Called Up Players" },
  ];

  return (
    <>
      <div className="flex justify-center my-16 gap-4">
        {/* Dropdown untuk memilih tipe pemain */}
        <Dropdown
          value={selectedType}
          options={teamTypeOptions}
          onChange={(value) => {
            router.push(`/${teamType}/${teamName}/${value}/players`);
          }}
        />

        {/* Dropdown untuk filter callup */}
        {teamType === "nation" && (
          <Dropdown
            value={selectedFilter}
            options={filterCallupOptions}
            onChange={setSelectedFilter}
          />
        )}
      </div>
    </>
  );
}
