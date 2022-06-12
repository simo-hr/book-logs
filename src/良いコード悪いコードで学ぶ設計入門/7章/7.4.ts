export class Member {
  constructor(public id: string, public hitPoint: number) { }
  isAlive(): boolean {
    return this.hitPoint > 0
  }
}

// コレクション処理をカプセル化する
export class Party {
  static MAX_MEMBER_COUNT = 4
  constructor(private members: Member[]) { }
  add(newMember: Member): Party {
    if (this.exists(newMember)) throw new Error('already exists')
    if (this.isFull()) throw new Error('full')
    // 元のmembersを変化させない
    const adding: Member[] = [...this.members, newMember]
    return new Party(adding)
  }

  exists(member: Member): boolean {
    return this.members.some(_member => _member.id === member.id)
  }

  isAlive(): boolean {
    return this.members.some(_member => _member.isAlive())
  }

  isFull(): boolean {
    return this.members.length === Party.MAX_MEMBER_COUNT
  }
  // 外部にコレクションを渡すようにする場合はイミュータブルにする
  getMembers(): Readonly<Member[]> {
    const members = [...this.members] as const
    return members
  }
}