export class Calculator{
    #id
    #result;
    #record;
    #totalOps;

    constructor(num1, num2, operator) {
        let result
        if(operator === "add") result = num1 + num2  
        else if(operator === "sub") result = num1 - num2  
        else if(operator === "mul") result = num1 * num2  
        else result = num1 / num2

        this.setResult(result)
        this.#totalOps = 1
        this.#id = Math.floor(Math.random() * 1000)

        const record = []

        record.push({type: "init", op: operator, value: null, result: this.#result})
        this.#record = record
    }

    operator(num, op) {
        let result = this.#result

        if(op === "add") result = result + num  
        else if(op === "sub") result = result - num  
        else if(op === "mul") result = result * num  
        else result = result / num
        
        this.#result = result
        return result
    }

    resetCalculator() {
        this.#id = null
        this.#record = null
        this.#result = null
        this.#totalOps = null
    }

    setResult(result) {
        this.#result = result
    }

    setRecord(result) {
        if(Array.isArray(result)) this.#record = result
        else this.#record.push(result)
    }

    setTotalOps(op) {
        if(op === '+') this.#totalOps++
        else this.#totalOps-- 
    }
    
    getId() {
        return this.#id
    }
    
    getResult() {
        return this.#result
    }

    getRecord() {
        return this.#record
    }

    getTotalOps() {
        return this.#totalOps
    }

    getResponse() {
        return {
            id: this.#id,
            result: this.#result,
            totalOps: this.#totalOps
        }
    }

    popRecord() {
        this.#record.pop()
    }
    
}
