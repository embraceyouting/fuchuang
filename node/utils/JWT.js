const jwt = require('jsonwebtoken')
const secret = "flyview-feiyue"

const JWT = {
    generate(payload, expiresIn = "30d") {
        return jwt.sign(payload, secret, { expiresIn })
    },
    verify(token) {
        try {
            return jwt.verify(token, secret)
        }catch {
            return false
        }
    }
}

module.exports = JWT