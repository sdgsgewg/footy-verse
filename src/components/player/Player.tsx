"use client";

import { useState, useEffect, useContext } from "react";
import playerData from "../../data/playerData";
import PlayerSection from "./PlayerSection";
import { PlayerContext } from "../../context/PlayerContext";
import SearchBox from "./search/SearchBox";
import FilterDropdown from "./filter/FilterDropdown";
import { useParams } from "next/navigation";
import { Player as PlayerType } from "@/interface/Player";

const Player = () => {
  const cleanName = (name: string) => {
    return name
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word
  };

  const params = useParams();
  const teamType = typeof params.teamType === "string" ? params.teamType : "";
  const teamName = typeof params.teamName === "string" ? params.teamName : "";
  const playerType =
    typeof params.playerType === "string" ? params.playerType : "";

  const teamData = playerData[teamName as keyof typeof playerData];
  const availableTypes = teamData ? Object.keys(teamData) : [];
  const selectedType = availableTypes.includes(playerType)
    ? playerType
    : availableTypes[0] || "";

  const { players, setPlayers } = useContext(PlayerContext);

  const [selectedFilter, setSelectedFilter] = useState("all-players");
  const [searchTerm, setSearchTerm] = useState("");

  const [prevParams, setPrevParams] = useState({ teamName, selectedType });

  if (
    prevParams.teamName !== teamName ||
    prevParams.selectedType !== selectedType
  ) {
    setPrevParams({ teamName, selectedType });
    setSelectedFilter("all-players");
    setSearchTerm("");
  }

  // useEffect: untuk update state ketika URL berubah
  useEffect(() => {
    const data = playerData[teamName as keyof typeof playerData];
    const newPlayers = data
      ? (data as Record<string, PlayerType[]>)[selectedType] || []
      : [];
    setPlayers(newPlayers);
  }, [teamName, selectedType, setPlayers]);

  const filteredPlayers = players.filter((player) => {
    const matchesFilter =
      selectedFilter === "called-up-players" ? player.isCalledUp : true;
    const matchesSearch = searchTerm
      ? player.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesFilter && matchesSearch;
  });

  const groupedPlayers = [
    {
      title: "Goalkeepers",
      players: filteredPlayers.filter((p) =>
        p.positions[0].includes("Goalkeeper"),
      ),
    },
    {
      title: "Defenders",
      players: filteredPlayers.filter((p) => p.positions[0].includes("Back")),
    },
    {
      title: "Midfielders",
      players: filteredPlayers.filter((p) =>
        p.positions[0].includes("Midfield"),
      ),
    },
    {
      title: "Forwards",
      players: filteredPlayers.filter((p) =>
        ["Winger", "Forward"].some((pos) => p.positions[0].includes(pos)),
      ),
    },
  ];

  return (
    <section id="player" className="pt-36 pb-16">
      <div className="w-full">
        <div className="max-w-xl mx-auto text-center mb-8">
          <h4 className="font-semibold text-lg text-tertiary">Player</h4>
          <h2 className="font-bold text-primary text-3xl mb-4 sm:text-4xl lg:text-5xl">
            {cleanName(teamName)} Teams
          </h2>
          <p className="font-medium text-md text-secondary md:text-lg">
            {cleanName(teamName) +
              " " +
              (selectedType
                ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
                : "")}{" "}
            {selectedType?.toLowerCase() === "academy" ? "" : "Senior "} Teams
          </p>
        </div>

        {/* Filter */}
        <FilterDropdown
          teamType={teamType}
          teamName={teamName}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedType={selectedType}
          availableTypes={availableTypes}
        />

        {/* Search Box */}
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Hasil Entri Players */}
      {/* Tidak Ditemukan */}
      {filteredPlayers.length === 0 && (
        <div className="text-center text-gray-500">
          <p>Player Not Found</p>
        </div>
      )}
      {/* Ditemukan */}
      {groupedPlayers.map(({ title, players }) => (
        <PlayerSection
          key={title}
          title={title}
          teamType={teamType}
          teamName={teamName}
          players={players}
          playerType={selectedType}
        />
      ))}
    </section>
  );
};

export default Player;
