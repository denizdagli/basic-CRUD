"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
const PORT = 3000;
//middleware
app.use(express_1.default.json());
//db connection
mongoose_1.default.connect('mongodb://127.0.0.1:27017/tsCRUD').then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
});
app.use('/api/todos', todos_1.default);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
