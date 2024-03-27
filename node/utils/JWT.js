const jwt = require('jsonwebtoken')
const secret = "feiyue"

const JWT = {
    generate(payload, expiresIn = "1h") {
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