"use client";

import { createContext, useReducer, useMemo } from "react";
import playerReducer from "./PlayerReducer";
import menPlayerEntries from "../data/arsenal/menPlayerEntries";
import { Player } from "@/interface/Player";

// Initial State
const initialState = {
  players: menPlayerEntries,
};

export interface PlayerContextType {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (player: Player) => void;
}

// Create Context
export const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

// Provider Component
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Actions
  function setPlayers(players: Player[]) {
    dispatch({ type: "SET_PLAYERS", payload: players });
  }

  function addPlayer(player: Player) {
    dispatch({ type: "ADD_PLAYER", payload: player });
  }

  function removePlayer(id: string) {
    dispatch({ type: "REMOVE_PLAYER", payload: id });
  }

  function updatePlayer(updatedPlayer: Player) {
    dispatch({ type: "UPDATE_PLAYER", payload: updatedPlayer });
  }

  // Memoizing the context value to optimize performance
  const value = useMemo(
    () => ({
      players: state.players,
      setPlayers,
      addPlayer,
      removePlayer,
      updatePlayer,
    }),
    [state.players],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
