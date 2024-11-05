import BaseModel from "~/nuxt-base/_app/models/BaseModel";

export default class Statistic extends BaseModel {
  static entity = "statistics";

  static fields() {
    return {
      id: this.uid(),
      type: this.string(""),
      home_value_first_half: this.number(null),
      home_value_second_half: this.number(null),
      away_value_first_half: this.number(null),
      away_value_second_half: this.number(null),
      match_id: this.string(""),
    };
  }
}
