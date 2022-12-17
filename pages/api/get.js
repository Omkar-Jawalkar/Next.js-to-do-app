// import { doc, getDoc, docSnap } from "firebase/firestore";
// import db from "../../firebase/clientApp";
// export default handler = async (req, res) => {
//   const user = req.body;
  
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     res.status(200).json({ message: docSnap.data() });
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//     res.status(500).json({ message: "No such document!" });
//   }
// };
