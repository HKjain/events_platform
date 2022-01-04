import { connectToDatabase } from '../../../../util/mongodb';
import { ObjectId } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    let userId = req.query.userId;
    const type = userId[0];
    userId = userId.slice(1);

    const users_events = await db
      .collection('users_events')
      .findOne({ user_id: userId });

    if (!users_events) {
      res.json({ message: 'No Events for the Institute Exists!' });
      return;
    }

    var listOfEvents = users_events.event_ids;
    var findIds = [];
    var findIdsE = [];
    for (let i = 0; i < listOfEvents.length; i++) {
      const eventId = listOfEvents[i];
      findIds.push({ _id: ObjectId(eventId) });
      findIdsE.push({ eventId: eventId });
    }

    if (type === 'e') {
      if (findIds.length === 0) {
        res.json({ events: null });
        return;
      }

      const eventsDetails = await db
        .collection('events')
        .find({ $or: findIds })
        .toArray();
      console.log('called above');
      res.json({ events: eventsDetails });
      return;
    } else {
      if (findIdsE.length === 0) {
        res.json({ users: null });
        return;
      }
      const usersList = await db
        .collection('student_event')
        .find({ $or: findIdsE })
        .toArray();

      if (usersList.length === 0) {
        res.json({ users: null });
        return;
      }
      console.log(usersList);
      res.json({ users: usersList });
      return;
    }
  }
}
export default handler;
