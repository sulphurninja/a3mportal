import connectDB from '../../utils/connectDB';
import User from '../../models/userModel';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await User.find().select('name userName groupId active');
      res.status(200).json(users);

    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
