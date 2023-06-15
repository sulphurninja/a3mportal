// pages/api/internGroups.js
import connectDB from '../../utils/connectDB';
import InternGroup from '../../models/InternGroup';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body;
      console.log(req.body);

      const internGroup = new InternGroup({
        name,
      });

      const newInternGroup = await internGroup.save();

      res.status(201).json(newInternGroup);
      console.log("success!!!")
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
