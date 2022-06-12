// 不変で堅牢なクラス
class AttackPower {
  static MIN: number = 0
  readonly value: number

  constructor(value: number) {
    if (value < AttackPower.MIN) {
      throw new Error('value is too small')
    }
    this.value = value
  }

  /**
   * 攻撃力を強化する
   * @param increment 攻撃力の増分
   * @returns 強化された攻撃力
   */
  public reinForce(increment: AttackPower): AttackPower {
    return new AttackPower(this.value + increment.value) // valueを変更しない
  }
  /**
   * 無力化する
   * @return 無力化された攻撃力
   */
  public disable(): AttackPower {
    return new AttackPower(AttackPower.MIN) // valueを変更しない
  }
}

class Weapon {
  constructor(public readonly attackPower: AttackPower) {
    this.attackPower = attackPower
  }

  /**
   * 武器を強化する
   * @param increment 攻撃力の増分
   * @return 強化した武器
   */
  reinForce(increment: AttackPower): Weapon {
    const reinForced = this.attackPower.reinForce(increment)
    return new Weapon(reinForced)
  }
}

class HitPoint {
  private static readonly MIN: number = 0
  constructor(public amount: number) {
    if (amount < HitPoint.MIN) {
      throw new Error('value is too small')
    }
  }

  /**
   * ダメージを受ける
   * @param damageAmount ダメージ量
   */
  damage(damageAmount: number): void {
    const nextAmount = this.amount - damageAmount
    this.amount = Math.max(HitPoint.MIN, nextAmount)
  }

  /** @return ヒットポイントがゼロであればtrue */
  isZero(): boolean {
    return this.amount === HitPoint.MIN
  }
}

type StateType = 'alive' | 'dead'
export class Member {
  readonly hitPoint: HitPoint
  readonly states: StateType[]

  constructor(hitPoint: HitPoint, states: StateType[]) {
    this.hitPoint = hitPoint
    this.states = states
  }

  damage(damageAmount: number): void {
    this.hitPoint.damage(damageAmount)
    if (this.hitPoint.isZero()) {
      this.states.push('dead')
    }
  }
}

const attackPowerA = new AttackPower(20)
const attackPowerB = new AttackPower(20)

const weaponA = new Weapon(attackPowerA)
const weaponB = new Weapon(attackPowerB)

const increment = new AttackPower(10)
const reinForcedWeaponA = weaponA.reinForce(increment)

const memberA = new Member(new HitPoint(100), ['alive'])
memberA.damage(40)
console.log(memberA.states)
memberA.damage(50)
console.log(memberA.states)
memberA.damage(70)
console.log(memberA.states)
