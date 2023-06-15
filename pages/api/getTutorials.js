import connectDB from '../../utils/connectDB';
import Tutorial from '../../models/Tutorial';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { groupId } = req.query;
      const tasks = await Tutorial.find({ groupId });
      res.status(200).json(tasks);
      console.log(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
