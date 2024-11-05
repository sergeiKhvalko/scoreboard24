import BaseModel from "~/nuxt-base/_app/models/BaseModel";

export default class Team extends BaseModel {
  static entity = "teams";

  static fields() {
    return {
      id: this.uid(),
      name: this.string(""),
      logo: this.string(""),
    };
  }
}
