import BaseModel from "~/nuxt-base/_app/models/BaseModel";

export default class Stadium extends BaseModel {
  static entity = "stadiums";

  static fields() {
    return {
      id: this.uid(),
      name: this.string(""),
      capacity: this.number(null),
    };
  }
}
