import Model from './model'
import type { BillingType } from './utils'

export default class Category extends Model {
  public id: string
  public name: string
  public type: BillingType

  constructor(payload: any) {
    const { id, name, type } = payload
    super(id)
    this.id = id
    this.name = name
    this.type = type
  }
}
