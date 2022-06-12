// 型チェックで分岐しないこと

// interfaceを使っても条件分岐が減らない場合がある


class Money {
  private amount: number
  constructor(amount: number) {
    this.amount = amount
  }
  getAmount(): number {
    return this.amount
  }
  add(money: Money) {
    return new Money(this.amount + money.getAmount())
  }
}
interface BadHotelRates {
  fee(): Money
}

class BadRegularRates implements BadHotelRates {
  fee(): Money {
    return new Money(7000)
  }
}
class BadPremiumRates implements BadHotelRates {
  fee(): Money {
    return new Money(12000)
  }
}

// ✖️型判定による繁忙期料金の切り替え
//リスコフの置換原則に反している
// 基本型(interface)を継承型に置き換えても問題なく動作しなければならない
const hotelRates: BadRegularRates = new BadRegularRates()
let busySeasonFee: Money
if (hotelRates instanceof BadRegularRates) {
  busySeasonFee = hotelRates.fee().add(new Money(3000))
}
if (hotelRates instanceof BadPremiumRates) {
  busySeasonFee = hotelRates.fee().add(new Money(5000))
}


// interfaceによる型判定が不要になり、リスコフの置換原則を遵守している
interface HotelRates {
  fee(): Money
  busySeasonFee(): Money
}

class RegularRates implements HotelRates {
  fee(): Money {
    return new Money(7000)
  }
  busySeasonFee(): Money {
    return this.fee().add(new Money(3000))
  }
}
class PremiumRates implements HotelRates {
  fee(): Money {
    return new Money(12000)
  }
  busySeasonFee(): Money {
    return this.fee().add(new Money(5000))
  }
}