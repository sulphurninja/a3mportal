// pages/api/tutorials.js
import connectDB from '../../utils/connectDB';
import Tutorial from '../../models/Tutorial';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, description, groupId } = req.body;

      const tutorial = new Tutorial({
        title,
        description,
        groupId,
      });

      const newTutorial = await tutorial.save();

      res.status(201).json(newTutorial);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
