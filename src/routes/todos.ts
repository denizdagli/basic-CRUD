import express, {Request,Response} from "express";
import Todo,{ITodo} from "../models/Todo";
const router=express.Router();
router.get("/",async(req:Request,res:Response)=>{
    try{
        const todos:ITodo[]=await Todo.find();
        res.status(200).json({todos});
    }catch(error){
        throw error;
    }
}
);
router.post("/",async(req:Request,res:Response)=>{
    try {
        const { title, description }: { title: string, description: string } = req.body;
        const newTodo: ITodo = new Todo({
          title,
          description,
        });
        const savedTodo: ITodo = await newTodo.save();
        res.status(201).json(savedTodo);
      } catch (error) {
        res.status(500).json({ error: 'Görev eklerken bir hata oluştu.' });
      }
    });
    
    // Belirli bir görevi getirme
    router.get('/:id', async (req: Request, res: Response) => {
      try {
        const todo: ITodo | null = await Todo.findById(req.params.id);
        if (!todo) {
          res.status(404).json({ error: 'Görev bulunamadı.' });
        } else {
          res.json(todo);
        }
      } catch (error) {
        res.status(500).json({ error: 'Görevi getirirken bir hata oluştu.' });
      }
    });
    
    // Belirli bir görevi güncelleme
    router.put('/:id', async (req: Request, res: Response) => {
      try {
        const { title, description }: { title: string, description: string } = req.body;
        const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
          req.params.id,
          { title, description },
          { new: true }
        );
        if (!updatedTodo) {
          res.status(404).json({ error: 'Güncellenecek görev bulunamadı.' });
        } else {
          res.json(updatedTodo);
        }
      } catch (error) {
        res.status(500).json({ error: 'Görevi güncellerken bir hata oluştu.' });
      }
    });
    
    // Belirli bir görevi silme
    router.delete('/:id', async (req: Request, res: Response) => {
      try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
          res.status(404).json({ error: 'Silinecek görev bulunamadı.' });
        } else {
          res.json(deletedTodo);
        }
      } catch (error) {
        res.status(500).json({ error: 'Görevi silerken bir hata oluştu.' });
      }
    });
    
    export default router;