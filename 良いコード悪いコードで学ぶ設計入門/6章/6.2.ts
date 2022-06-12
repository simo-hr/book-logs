/**
 * 条件分岐 迷宮化した分岐処理を解きほぐす技法
 */

// スマートにswitch文重複を解消するinterface
// interfaceを使わない場合
class RectangleClass {
  private width: number
  private height: number
  area(): number {
    return this.width * this.height
  }
}
class CircleClass {
  private radius: number
  area(): number {
    return this.radius * this.radius * Math.PI
  }
}

//共通メソッドをつくりたくてもinstanceofメソッドで条件分岐が必要になる
const showArea1 = (shape: Object): void => {
  if (shape instanceof RectangleClass) {
    console.log(shape.area())
  }
  if (shape instanceof CircleClass) {
    console.log(shape.area())
  }
}

interface Shape {
  area(): number
}
class Rectangle implements Shape {
  private width: number
  private height: number
  area(): number {
    return this.width * this.height
  }
}
class Circle implements Shape {
  private radius: number
  area(): number {
    return this.radius * this.radius * Math.PI
  }
}

const showArea = (shape: Shape): void => {
  console.log(shape.area())
}

const shape: Shape = new Rectangle()

interface Magic {
  name(): string
  costMagicPoint(): number
  attackPower(): number
  costTechnicalPoint(): number
}

class Member {
  level: number
  agility: number
}

class Fire implements Magic {
  private member: Member
  constructor(member: Member) {
    this.member = member
  }
  name(): string {
    return 'ファイア'
  }
  costMagicPoint(): number {
    return 2
  }
  attackPower(): number {
    return 20 + this.member.level * 0.5
  }
  costTechnicalPoint(): number {
    return 0
  }
}
class Shiden implements Magic {
  private member: Member
  constructor(member: Member) {
    this.member = member
  }
  name(): string {
    return '紫電'
  }
  costMagicPoint(): number {
    return 5 + this.member.level * 0.2
  }
  attackPower(): number {
    return 50 + this.member.agility * 0.5
  }
  costTechnicalPoint(): number {
    return 5
  }
}

type MagicType = 'fire' | 'shiden'

// Mapで条件分岐の代わりを果たす
//interfaceを用いて処理を一斉に切り替える設計をストラテジパターンという
// 未実装のメソッドをコンパイラが検知するので実装忘れを防ぐことができる
let magics = new Map<MagicType, Magic>()
magics.set('fire', new Fire(new Member()))
magics.set('shiden', new Shiden(new Member()))

const magicAttack = (magicType: MagicType): void => {
  const usingMagic: Magic | undefined = magics.get(magicType)
  if (!usingMagic) throw new Error('magic not found')
  showMagicName(usingMagic)
}

const showMagicName = (magic: Magic): void => {
  console.log(magic.name())
}
