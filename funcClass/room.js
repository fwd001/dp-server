const Game = require('./game.js')
const User = require('./user')

class Room {
    constructor(id) {
        this.id = id // 唯一id，也是房间号，同socket 连接号
        this.playerList = [] // 玩家数组
        this.game = new Game() // 游戏实例 控制游戏进度，游戏游戏状态的实例
        this.socket = null
    }

    add(name) {
        if (this.playerList.length >= 6) return
        let user = this.find(name)
        if (!user) {
            user = this.createUser(name)
            this.playerList.push(user)
        }
        return user
    }

    createUser(name) {
        return new User(name)
    }

    remove() { // 离开

    }

    find(name) {
        return this.playerList.find(v => v.name === name)
    }
    getSocketIo(io) {
        if(!this.socket) {
            this.socket = io
        }
        return this.socket
    }
}


class Rooms {
    constructor() {
        this.list = [] // 房间列表
    }

    push(id) {// 新家房间
        id = parseInt(id)
        let room = this.find(id)
        if (!room) {
            room = new Room(id)
            this.list.push(room)
        }
        return room
    }

    remove(id) { // 移除某个房间
        id = parseInt(id)
        this.list = this.list.filter(v => v.id !== id)
    }

    find(id) {  // 查找房间
        id = parseInt(id)
        const room = this.list.find(v => v.id === id)
        return room
    }


}
const rooms = new Rooms

module.exports = rooms