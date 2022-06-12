/**
 * staticメソッドは低凝集問題を引き起こしやすいため乱用すべきではない
 */

class PaymentManager {
  private discountRate: number

  constructor(discountRate: number) {
    this.discountRate = discountRate
  }

  // インスタンスメソッドのふりをしたstaticメソッド（インスタンス変数を全く使っていない）
  public add(moneyAmount1: number, moneyAmount2: number): number {
    return moneyAmount1 + moneyAmount2
  }
}
class ConsumptionPoint {
  value: number

  private constructor(value: number) {
    this.value = value
  }
}

// privateコンストラクタ+ファクトリメソッドで目的別初期化
class GiftPoint {
  private static readonly MIN_POINT = 0
  private static readonly STANDARD_MEMBER_POINT = 3000
  private static readonly PREMIUM_MEMBER_POINT = 10000
  value: number

  private constructor(value: number) {
    if (value < GiftPoint.MIN_POINT) {
      throw new Error('value is too small')
    }
    this.value = value
  }

  static forStandardMember(): GiftPoint {
    return new GiftPoint(GiftPoint.STANDARD_MEMBER_POINT)
  }

  static forPremiumMember(): GiftPoint {
    return new GiftPoint(GiftPoint.PREMIUM_MEMBER_POINT)
  }

  add(other: GiftPoint) {
    return new GiftPoint(this.value + other.value)
  }

  isEnough(point: ConsumptionPoint): boolean {
    return point.value <= this.value
  }

  consume(point: ConsumptionPoint): GiftPoint {
    if (!this.isEnough(point)) {
      throw new Error('not enough point')
    }
    return new GiftPoint(this.value - point.value)
  }
}

const standardMemberPoint = GiftPoint.forStandardMember()
console.log(standardMemberPoint.value)
const premiumMemberPoint = GiftPoint.forPremiumMember()
console.log(premiumMemberPoint.value)

type BigDecimal = any
type AmountExcludingTax = any
type TaxRate = any
class AmountIncludingTax {
  public value: BigDecimal

  amountIncludeTax(amountExcludingTax: AmountExcludingTax, taxRate: TaxRate) {
    this.value = amountExcludingTax.value.multiply(taxRate.value)
  }
}

/**
 * 横断的関心毎は共通処理としてまとめ上げてもよい。staticメソッドでもよい。
 * - ログ出力
 * - エラー検出
 * - デバッグ
 * - 例外処理
 * - キャッシュ
 * - 同期処理
 * - 同期処理
 * - 分散処置
 */
// 横断的関心毎

// 5.4 結果を返すために引数を使わない

// ✖️低凝集
// locationが出力引数になっている。操作対象(ActorLocation)と操作ロジック(ActorManager)が別々
class ActorManager {
  shift(location: ActorLocation, shiftX: number, shiftY: number) {
    location.x += shiftX
    location.y += shiftY
  }
}

class ActorLocation {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  //　○引数を変更しないようになった
  shift(shiftX: number, shiftY: number) {
    const nextX = this.x + shiftX
    const nextY = this.y + shiftY
    return new ActorLocation(nextX, nextY)
  }
}

// 5.5 多すぎる引数

// ✖️引数が多い
// プリミティブ型執着
const recoverMagicPoint = (
  currentMagicPoint: number,
  originalMaxMagicPoint: number,
  maxMagicPointIncrements: number[],
  recoveryAmount: number
) => {
  let currentMaxMagicPoint = originalMaxMagicPoint
  maxMagicPointIncrements.forEach((increment) => {
    currentMagicPoint += increment
  })
  return Math.min(currentMagicPoint + recoveryAmount, currentMaxMagicPoint)
}

// ○魔法力に関係するロジックをカプセル化
// 引数多すぎる問題を解消
class MagicPoint {
  private currentAmount: number
  private originalMaxAmount: number
  private maxIncrements: number[]

  current(): number {
    return this.currentAmount
  }
  max(): number {
    let amount = this.originalMaxAmount
    this.maxIncrements.forEach((increment) => {
      amount += increment
    })
    return amount
  }
  recover(recoveryAmount: number) {
    this.currentAmount = Math.min(this.currentAmount + recoveryAmount, this.max())
  }
  consume(consumeAmount: number): void {
    // 省略
  }
}

// 5.6 メソッドチェイン


let party: any
type Armor = any
// メソッドチェイン：戻り値の要素に数珠繋ぎで次々にアクセスする書き方
// 代入するコードをどこでも書ける上に、さまざまな要素にアクセス可能
// どこかの要素の仕様が変更された場合の影響範囲が大きい

const equipArmor = (memberId: number, newArmor: Armor): void => {
  if (party.members[memberId].equipments.canChange) {
    party.members[memberId].equipments.armor = newArmor
  }
}

// デルメルの法則：利用するオブジェクトの内部を知るべきではない、知らない人に話しかけるな
// 呼び出す側はメソッドを命じるだけで、呼ばれた側が適切な判断をや制御を担う
class Equipment {
  static EMPTY = {
    name: '',
    price: 0,
    defence: 0,
    magicDefence: 0
  }
  name: string
  price: number
  defence: number
  magicDefence: number
}
class Equipments {
  private canChange: boolean
  private head: Equipment
  private armor: Equipment
  private arm: Equipment

  equipArmor(newArmor: Equipment): void {
    if (this.canChange) this.armor = newArmor
  }
  deactivateAll(): void {
    this.head = Equipment.EMPTY
    this.armor = Equipment.EMPTY
    this.arm = Equipment.EMPTY
  }
}
