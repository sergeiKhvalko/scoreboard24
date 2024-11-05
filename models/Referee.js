import BaseModel from "~/nuxt-base/_app/models/BaseModel";

export default class Referee extends BaseModel {
  static entity = "referees";

  static fields() {
    return {
      id: this.uid(),
      name: this.string(""),
    };
  }
}
