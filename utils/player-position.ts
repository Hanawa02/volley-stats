import {
  player_position_coach,
  player_position_libero,
  player_position_setter,
  player_position_middle_blocker,
  player_position_opposite_hitter,
  player_position_outside_hitter,
} from "translations";
import type { PlayerPositions } from "~/types/database.enums";

export const playerPositionTranslation = (type: PlayerPositions) => {
  switch (type) {
    case "coach":
      return player_position_coach();
    case "libero":
      return player_position_libero();
    case "setter":
      return player_position_setter();
    case "middle_blocker":
      return player_position_middle_blocker();
    case "opposite_hitter":
      return player_position_opposite_hitter();
    case "outside_hitter":
      return player_position_outside_hitter();
    default:
      return player_position_coach();
  }
};
