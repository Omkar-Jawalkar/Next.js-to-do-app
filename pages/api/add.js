import { async } from "@firebase/util";
import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase/clientApp";

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  console.log("req", req.body);
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    res
      .status(200)
      .json({ message: `Document written with ID:, ${docRef.id}` });
  } catch (e) {
    res.status(500).json({ message: `Error stoing info` });
  }
}
