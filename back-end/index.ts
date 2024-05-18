import cors from "cors";
import userRoute from "./routes/userRoute";
import express from "express";
import { PrismaClient } from '@prisma/client';


const port = process.env.port || 3001;
const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(express.json());
app.post('/todo', async (req, res) => {
  const { itemName } = req.body;

  try {
    const newItem = await prisma.toDoItem.create({
      data: {
        itemName: itemName
      }
    });
    return res.json(newItem);
  } catch (error) {
    console.error("Error creating todo item:", error);
    return res.status(500).json({ error: "An error occurred while creating todo item." });
  }
});

app.get('/todo', async (req, res) => {
  try {
    const items = await prisma.toDoItem.findMany();
    return res.json(items);
  } catch (error) {
    console.error("Error fetching todo items:", error);
    return res.status(500).json({ error: "An error occurred while fetching todo items." });
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { itemName } = req.body;

  try {
    const updatedItem = await prisma.toDoItem.update({
      where: {
        id: id,
      },
      data: {
        itemName: itemName,
      },
    });
    return res.json(updatedItem);
  } catch (error) {
    console.error("Error updating todo item:", error);
    return res.status(500).json({ error: "An error occurred while updating todo item." });
  }
});

// Delete a todo item
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.toDoItem.delete({
      where: {
        id: id, // Expecting id to be a string
      },
    });
    return res.status(200).json({ message: "Todo item deleted successfully." });
  } catch (error) {
    console.error("Error deleting todo item:", error);
    return res.status(500).json({ error: "An error occurred while deleting todo item." });
  }
});

app.listen(port, () => {
  console.log(`Active on port ${port}`);
});
