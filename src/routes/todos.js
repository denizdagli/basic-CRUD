"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Todo_1 = __importDefault(require("../models/Todo"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo_1.default({
            title,
            description,
        });
        const savedTodo = yield newTodo.save();
        res.status(201).json(savedTodo);
    }
    catch (error) {
        res.status(500).json({ error: 'Görev eklerken bir hata oluştu.' });
    }
}));
// Belirli bir görevi getirme
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield Todo_1.default.findById(req.params.id);
        if (!todo) {
            res.status(404).json({ error: 'Görev bulunamadı.' });
        }
        else {
            res.json(todo);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Görevi getirirken bir hata oluştu.' });
    }
}));
// Belirli bir görevi güncelleme
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const updatedTodo = yield Todo_1.default.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (!updatedTodo) {
            res.status(404).json({ error: 'Güncellenecek görev bulunamadı.' });
        }
        else {
            res.json(updatedTodo);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Görevi güncellerken bir hata oluştu.' });
    }
}));
// Belirli bir görevi silme
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield Todo_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            res.status(404).json({ error: 'Silinecek görev bulunamadı.' });
        }
        else {
            res.json(deletedTodo);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Görevi silerken bir hata oluştu.' });
    }
}));
exports.default = router;
