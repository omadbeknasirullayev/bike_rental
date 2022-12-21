const ApiError = require("../errors/ApiError")

module.exports = function (err, ctx) {
    if (err instanceof ApiError) {
        ctx.status = err.status
        return ctx.body = {message: err.message}
    }
    if (err.message.includes("Unexpected token")) {
        ctx.status = err.status
        return ctx.body = {message: err.message}
    }
    if (err.message == "Not Found") {
        console.log(343)
        ctx.status = 404
        return ctx.body = {message: "Serverda xatolik"}
    }
    ctx.status = 500 
    return ctx.body = {message: "Nazarda tutilmagan xatolik"}
}