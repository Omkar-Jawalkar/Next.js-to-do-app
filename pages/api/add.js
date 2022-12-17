import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import db from "../../firebase/clientApp";

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  const myDetails = req.body;
  // console.log("req", req.body);

  try {
    const myTodoData = {
      id: myDetails.id,
      title: myDetails.title,
      description: myDetails.description,
      priority: myDetails.priority,
      status: myDetails.status,
      time: myDetails.time,
      completeStatus: false,
      myColor: myDetails.myColor,
    };
    // console.log("myTodoData", myTodoData);
    const docRef = doc(
      db,
      "users",
      `${myDetails.userEmail}`,
      "todos",
      `${myDetails.id}`
    );
    // console.log("docRef", docRef);
    await setDoc(docRef, myTodoData);
    res.status(200).json({ message: `Document written` });
  } catch (e) {
    console.log("My error", e);
    res.status(500).json({ message: `Error stoing info` });
  }
}
