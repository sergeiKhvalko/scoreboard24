import BaseModel from "~/nuxt-base/_app/models/BaseModel";
import Team from "./Team";

export default class Season extends BaseModel {
  static entity = "seasons";

  static fields() {
    return {
      id: this.uid(),
      year: this.string(""),
      league_id: this.string(""),
      teamsIds: this.attr([]),
      teams: this.hasManyBy(Team, "teamsIds"),
    };
  }
}
