/*
 * 良いクラスの構成要素
 * - インスタンス変数
 * - インスタンス変数を不正状態から防御し、正常に操作するメソッド
 *
 * 悪魔たち
 * - 重複コード
 * - 修正漏れ
 * - 可読性低下
 * - 生焼けオブジェクト
 * - 不正値の混入
 * - 思わぬ副作用
 * - あたいの私間違い
 */

// 自己防衛責務をすべてのクラスが備える
type Currency = 'USD' | 'EUR' | 'JPY'

// 値オブジェクト + 完全コンストラクタ
class Money {
  // 不変で思わぬ動作を防ぐ
  private readonly amount: number
  private readonly currency: Currency

  constructor(amount: number, currency: Currency) {
    // ガード節: インスタンス変数を不正状態から防御する
    if (amount < 0) {
      throw new Error('amount cannot be negative')
    }
    if (currency == null) {
      throw new Error('currency cannot be null or undefined')
    }
    this.amount = amount
    this.currency = currency
    // Object.freeze(this) JSの場合
  }

  // 計算ロジックをデータ保持側に寄せる
  // 金額以外のnumber型が入らないようにする
  // public add(other: number): Money {
  public add(other: Money): Money {
    if (other.currency !== this.currency) {
      throw new Error('currency mismatch')
    }
    const added = this.amount + other.amount
    return new Money(added, this.currency)
  }
}

const money = new Money(100, 'JPY')
// const newMoney = money.add(new Money(200, 'EUR')) // Error
const newMoney = money.add(new Money(200, 'JPY'))
console.log('newMoney', newMoney)
