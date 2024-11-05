import BaseModel from "~/nuxt-base/_app/models/BaseModel";
import Match from "./Match";

export default class Matchweek extends BaseModel {
  static entity = "matchweeks";

  static fields() {
    return {
      id: this.uid(),
      tour: this.number(null),
      season_id: this.string(""),
      matches: this.hasMany(Match, "matchweek_id"),
    };
  }
}
