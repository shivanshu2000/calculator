import { instance } from "./controller.js"

export const checkInitMiddleware = (req, res, next) => {
    if (!instance) return res.status(400).json("Please hit the init resquest before this!")
    next()
}

export const checkValidOps = (req, res, next) => {
    let {operator} = req.body
    if (!operator)  return res.status(400).json("Required: operator param!")

    const valid_ops = ['add', 'sub', 'mul', 'div']
    if(!valid_ops.includes(operator)) return res.status(400).json("Invalid operator: operators available are ['add', 'sub', 'mul', 'div']")

    next()
}