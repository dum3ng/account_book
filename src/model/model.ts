let id = 0
export type Id = number | string

export default class Model {
  public readonly _id: Id

  constructor(sid?: Id) {
    this._id = sid ?? id++
  }
}
