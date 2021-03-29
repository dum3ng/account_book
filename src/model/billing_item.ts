import Model from './model'
import type { BillingType } from './utils'

export default class BillingItem extends Model {
  public time: Date
  public type: BillingType
  public category: string
  public amount: number
  constructor(payload: any) {
    super()
    const { type, time, amount, category } = payload
    this.type = type
    this.time = typeof time === 'string' ? new Date(time) : time
    this.amount = amount
    this.category = category
  }

  // get category() {
  //   return this._category
  // }
}
