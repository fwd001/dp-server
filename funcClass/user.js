class User {
    constructor(name) {
        this.name = name
        this.wealth = 1000 // 财富
        this.handCards = [] // 手牌
        this.ready = false // 是否准备
    }
}

module.exports = User