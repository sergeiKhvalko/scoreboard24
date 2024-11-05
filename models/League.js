import BaseModel from "~/nuxt-base/_app/models/BaseModel";
import Season from "./Season";
import Matchweek from "./Matchweek";

export default class League extends BaseModel {
  static entity = "leagues";

  static fields() {
    return {
      id: this.uid(),
      name: this.string(""),
      logo: this.string(""),
      counry_id: this.string(""),
      matchweeks: this.hasManyThrough(
        Matchweek,
        Season,
        "league_id",
        "season_id",
      ),
    };
  }
}
