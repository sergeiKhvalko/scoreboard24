import BaseModel from "~/nuxt-base/_app/models/BaseModel";
import Referee from "./Referee";
import Stadium from "./Stadium";
import Team from "./Team";
import Statistic from "./Statistic";

export default class Match extends BaseModel {
  static entity = "matches";

  static fields() {
    return {
      id: this.uid(),
      referee_id: this.string(""),
      referee: this.hasOne(Referee, "home_team_id"),
      stadium_id: this.string(""),
      stadium: this.hasOne(Stadium, "home_team_id"),
      home_team_id: this.string(""),
      home_team: this.hasOne(Team, "home_team_id"),
      away_team_id: this.string(""),
      away_team: this.hasOne(Team, "away_team_id"),
      matchweek_id: this.string(""),

      home_win_odd: this.number(null),
      draw_odd: this.number(null),
      away_win_odd: this.number(null),

      goals_home: this.attr([]),
      goals_away: this.attr([]),

      // statisticsIds: this.attr([]),
      // statistics: this.hasManyBy(Statistic, "statisticsIds"),
      statistics: this.hasMany(Statistic, "match_id"),
    };
  }
}
