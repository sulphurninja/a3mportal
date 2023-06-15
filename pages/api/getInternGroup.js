// pages/api/internGroups.js
import connectDB from '../../utils/connectDB';
import InternGroup from '../../models/InternGroup';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const internGroups = await InternGroup.find({}, 'name'); // Fetch only the name field
      res.status(200).json(internGroups);
      console.log(internGroups)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
