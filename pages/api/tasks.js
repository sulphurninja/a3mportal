// pages/api/tasks.js
import connectDB from '../../utils/connectDB';
import Task from '../../models/Task';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, description, groupId } = req.body;

      const task = new Task({
        title,
        description,
        groupId,
      });

      const newTask = await task.save();

      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
