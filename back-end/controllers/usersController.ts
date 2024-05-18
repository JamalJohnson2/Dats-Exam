import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// @desc    Get users
// @route   GET /api/users
// @access  Public

async function getUser(req: Request, res: Response) {
  const users = await prisma.users.findMany({});
  if (users.length === 0) {
    return res.status(200).json({ message: "Sorry, no users found teehee." });
  }
  return res.status(200).json(users);
}

// @desc    Set users
// @route   POST /api/users/create
// @access  Public
async function setUser(req: Request, res: Response) {
  const { username, password } = req.body.data;

  const result = await prisma.users.create({
    data: {
      username,
      password,
    },
  });
  if (!result) {
    return res.status(500).json({ message: "Error creating users." });
  }
  return res.status(200).json(result);
}

// @desc    Delete lists
// @route   POST /api/lists/delete
// @access  Public
async function deleteUser(req: Request, res: Response) {
  const { userId } = req.body;

  //if successful, delete list.
  const result = await prisma.users.delete({
    where: { id: userId }
  });

  if (!result) {
    return res.status(500).json({ message: "Error deleting user." });
  }

  return res.status(200).json({ message: "List deleted.", result });
}

const usersController = { getUser, setUser, deleteUser };

export default usersController;
