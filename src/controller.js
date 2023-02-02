import { Calculator } from "./Caclulator.js"

export let instance

export const init = (req, res, next) => {

    let {num1, num2, operator} = req.body

    if(!num1 || !num2) return res.status(400).json("Two numbers are required to initialize a calculator: num1 & num2")
    
    num1 = parseInt(num1)
    num2 = parseInt(num2)

    if(isNaN(num1) || isNaN(num2)) res.status(400).json("Both params should be of type number")

    instance = new Calculator(parseInt(num1), parseInt(num2), operator)

    res.json(instance.getResponse())
}

export const operation = (req, res, next) => {
    let {num, operator} = req.body

    num = parseInt(num)

    if(!num) return res.status(400).json("Required: num param!")
    if(isNaN(num)) res.status(400).json("Param num should be of type number")

    const result = instance.operator(num, operator)
    instance.setTotalOps('+')

    const record = {
        type: "operation",
        op: operator,
        value: num,
        result
    }

    instance.setRecord(record)
    return res.json(instance.getResponse())
}

export const undo = (req, res, next) => {
   const {id} = req.body

   if(instance.getId() !== id) return res.status(400).json(`No calculator with id: ${id}`) 
   const record = instance.getRecord()

   if(record.length === 1) return res.status(400).json("You can not make more undo operations!")

   const {op, value} = record[record.length - 1]

   const result = instance.getResult()
   if(op === "add") instance.setResult(result - value) 
   else if(op === "sub") instance.setResult(result + value)
   else if(op === "mul") instance.setResult(result / value) 
   else instance.setResult(result * value) 

   instance.setTotalOps('-')
   instance.popRecord()
   
   res.json(instance.getResponse())
}

export const reset = (req, res, next) => {
    const {id: i} = req.query

    if(!i) return res.status(400).json("Required: id param")

    const id = instance.getId()
    if(parseInt(i) !== id) return res.status(400).json(`No calculator with id: ${i}`) 
    instance.resetCalculator()
    instance = null

    res.json({
     success: true,
     message: `calculator ${i} is now reset`
    })
}