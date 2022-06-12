// interfaceはswitch文の重複解消以外にも多重ネストや複雑化した分岐の解消にも役立つ

class PurchaseHistory {
  totalAmount: number
  returnRate: number
  purchaseFrequencyPerMonth: number

  constructor(totalAmount: number, returnRate: number, purchaseFrequencyPerMonth: number) {
    this.totalAmount = totalAmount
    this.returnRate = returnRate
    this.purchaseFrequencyPerMonth = purchaseFrequencyPerMonth
  }
}


// ポリシーパターンで条件を集約する
interface ExcellentCustomerRule {
  ok(history: PurchaseHistory): boolean
}

class GoldCustomerPurchaseAmountRule implements ExcellentCustomerRule {
  ok(history: PurchaseHistory): boolean {
    return history.totalAmount >= 100000
  }
}
class PurchaseFrequencyRule implements ExcellentCustomerRule {
  ok(history: PurchaseHistory): boolean {
    return history.purchaseFrequencyPerMonth >= 10
  }
}
class ReturnRateRule implements ExcellentCustomerRule {
  ok(history: PurchaseHistory): boolean {
    return history.returnRate <= 0.001
  }
}

class ExcellentCustomerPolicy {
  rules: Set<ExcellentCustomerRule>
  constructor() {
    this.rules = new Set<ExcellentCustomerRule>()
  }

  add(rule: ExcellentCustomerRule) {
    this.rules.add(rule)
  }

  complyWithAll(history: PurchaseHistory) {
    this.rules.forEach(rule => {
      if (!rule.ok(history)) return false
    })
    return true
  }
}

class GoldCustomerPolicy {
  private policy: ExcellentCustomerPolicy
  constructor() {
    this.policy = new ExcellentCustomerPolicy()
    this.policy.add(new GoldCustomerPurchaseAmountRule())
    this.policy.add(new PurchaseFrequencyRule())
    this.policy.add(new ReturnRateRule())
  }

  complyWithAll(history: PurchaseHistory) {
    return this.policy.complyWithAll(history)
  }
}
class SilverCustomerPolicy {
  private policy: ExcellentCustomerPolicy
  constructor() {
    this.policy = new ExcellentCustomerPolicy()
    this.policy.add(new PurchaseFrequencyRule())
    this.policy.add(new ReturnRateRule())
  }

  complyWithAll(history: PurchaseHistory) {
    return this.policy.complyWithAll(history)
  }
}
