//高凝集の誤解から来る蜜結合


// 販売価格とは別の概念が紛れ込んだ蜜結合なクラス
// 高凝集への意識が強く関係していそうなロジックを一箇所にまとめようとしましまう
class SellingPrice1 {
  private static SELLING_COMMISSION_RATE = 0.05
  private static DELIVERY_FREE_MIN = 2000
  private static SHOPPING_POINT_RATE = 0.01
  public amount: number
  constructor(amount: number) {
    if (amount < 0) {
      throw new Error('amount cannot be negative')
    }
    this.amount = amount
  }
  calcSelling() {
    return this.amount * SellingPrice1.SELLING_COMMISSION_RATE
  }
  calcDeliveryCharge() {
    return SellingPrice1.DELIVERY_FREE_MIN < this.amount ? 0 : 500
  }
  // ポイントは別概念
  calcShippingPoint() {
    return this.amount * SellingPrice1.SHOPPING_POINT_RATE
  }
}


// 疎結合な設計になった
export class SellingPrice {
  public amount: number
  constructor(amount: number) {
    if (amount < 0) {
      throw new Error('amount cannot be negative')
    }
    this.amount = amount
  }
}
class SellingCommission {
  private static SELLING_COMMISSION_RATE = 0.05
  public amount: number
  constructor(public sellingPrice: SellingPrice) {
    this.amount = sellingPrice.amount * SellingCommission.SELLING_COMMISSION_RATE
  }
}
class DeliveryCharge {
  private static DELIVERY_FREE_MIN = 2000
  public amount: number
  constructor(public sellingPrice: SellingPrice) {
    this.amount = DeliveryCharge.DELIVERY_FREE_MIN < sellingPrice.amount ? 0 : 500
  }
}
class ShoppingPoint {
  private static SHOPPING_POINT_RATE = 0.01
  public amount: number
  constructor(public sellingPrice: SellingPrice) {
    this.amount = sellingPrice.amount * ShoppingPoint.SHOPPING_POINT_RATE
  }
}