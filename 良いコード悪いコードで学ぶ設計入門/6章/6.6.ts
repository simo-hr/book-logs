// フラグ引数

class Member2 {
  hitPoint: number
  magicPoint: number
}

const member = new Member2()

//  フラグ引数はメソッドが何を行うか内部を理解しなければならなくなり、可読性が下がる
const damage = (damageFlag: boolean, damageAmount: number) => {
  if (damageFlag === true) {
    member.hitPoint -= damageAmount
    if (member.hitPoint <= 0) return
    member.hitPoint = 0
  } else {
    member.magicPoint -= damageAmount
    if (member.magicPoint <= 0) return
    member.magicPoint = 0
  }
}

// 切り替え機構をストラテジパターンで実現する
interface Damage {
  execute(damageAmount: number): void
}

class hitPointDamage implements Damage {
  member: Member2
  constructor(member: Member2) {
    this.member = member
  }
  execute(damageAmount: number): void {
    this.member.hitPoint -= damageAmount
    if (member.hitPoint <= 0) return
    this.member.hitPoint = 0
  }
}
class MagicPointDamage implements Damage {
  member: Member2
  constructor(member: Member2) {
    this.member = member
  }
  execute(damageAmount: number): void {
    this.member.magicPoint -= damageAmount
    if (member.magicPoint <= 0) return
    this.member.magicPoint = 0
  }
}

type DamageType = 'hitPoint' | 'magicPoint'
const damages = new Map<DamageType, Damage>()
damages.set('hitPoint', new hitPointDamage(member))
damages.set('magicPoint', new MagicPointDamage(member))
const applyDamage = (damageType: DamageType, damageAmount: number): void => {
  const damage: Damage | undefined = damages.get(damageType)
  if (!damage) throw new Error('damage is not found')
  damage.execute(damageAmount)
}