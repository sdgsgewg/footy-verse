import { Player } from "@/interface/Player";

export interface PlayerState {
  players: Player[];
}

export interface SetPlayersAction {
  type: "SET_PLAYERS";
  payload: Player[];
}

export interface AddPlayerAction {
  type: "ADD_PLAYER";
  payload: Player;
}

export interface RemovePlayerAction {
  type: "REMOVE_PLAYER";
  payload: string;
}

export interface UpdatePlayerAction {
  type: "UPDATE_PLAYER";
  payload: Player;
}

export type PlayerAction =
  | SetPlayersAction
  | AddPlayerAction
  | RemovePlayerAction
  | UpdatePlayerAction;

export default function playerReducer(
  state: PlayerState,
  action: PlayerAction,
) {
  switch (action.type) {
    case "SET_PLAYERS":
      return {
        ...state,
        players: action.payload,
      };
    case "ADD_PLAYER":
      return { ...state, players: [...state.players, action.payload] };
    case "REMOVE_PLAYER":
      return {
        ...state,
        players: state.players.filter(
          (player: Player) => player.id !== action.payload,
        ),
      };
    case "UPDATE_PLAYER":
      return {
        ...state,
        players: state.players.map((player: Player) =>
          player.id === action.payload.id ? action.payload : player,
        ),
      };
    default:
      return state;
  }
}
