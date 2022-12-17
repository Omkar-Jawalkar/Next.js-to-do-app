import db from "../../firebase/clientApp";
import { doc, deleteDoc, collection } from "firebase/firestore";

export default async function handler(req, res) {
  const { id, email } = req.body;
  try {
    const response = await deleteDoc(doc(db, `users/${email}/todos/${id}`));
    console.log("Delete response", response);
    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    console.log("My error", e);
    res.status(500).json({ message: "Error deleting" });
  }
}
