import connectDB from '../../utils/connectDB';
import User from '../../models/userModel';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await User.find();
      res.status(200).json(users);
      console.log(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
