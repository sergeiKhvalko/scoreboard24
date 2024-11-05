import BaseModel from "~/nuxt-base/_app/models/BaseModel";
import League from "./League";

export default class Country extends BaseModel {
  static entity = "countries";

  static fields() {
    return {
      id: this.uid(),
      name: this.string(""),
      leagues: this.hasMany(League, "counry_id"),
      flag: this.string(""),
    };
  }
}
