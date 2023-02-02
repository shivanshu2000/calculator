import express from "express"
import { init, operation, reset, undo } from "./controller.js";
import { checkInitMiddleware, checkValidOps } from "./middlewares.js";

const app = express();
app.use(express.json())

app.post("/init", checkValidOps ,init)

app.use(checkInitMiddleware)
app.post("/operation",checkValidOps ,operation)
app.put("/undo", undo)
app.get("/reset", reset)

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})