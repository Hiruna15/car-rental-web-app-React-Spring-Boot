// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useFirebase } from "../contexts/FirebaseContext";

// export default function EmailVerificationCheck() {
//   const auth = getAuth();
//   const { db, doc, setDoc } = useFirebase();
//   const navigate = useNavigate();

//   useEffect(
//     function () {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (user) {
//           user.reload().then(() => {
//             if (user.emailVerified) {
//               console.log(
//                 "user clicked on the email verification link successfully"
//               );

//               setDoc(
//                 doc(db, "users", user.uid),
//                 { verified: true },
//                 { merge: true }
//               )
//                 .then(() => {
//                   console.log("User verification status updated in Firestore.");

//                 })
//                 .catch((error) => {
//                   console.error("Error updating verification status: ", error);
//                 });
//             } else {

//               console.log("Email not verified. Please verify your email.");
//             }
//           });

//         }
//       });

//       return () => unsubscribe();
//     },
//     [auth, db, doc, setDoc, navigate]
//   );

//   return <p>Verfification email sent to the email you provided</p>;
// }

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import { useAuth } from "../contexts/AuthContext";

export default function EmailVerificationCheck() {
  const { db, doc, setDoc } = useFirebase();
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User object:", user);
        user
          .reload()
          .then(() => {
            if (user.emailVerified) {
              console.log(
                "User clicked on the email verification link successfully"
              );

              console.log("Attempting to update Firestore document");
              setDoc(
                doc(db, "users", user.uid),
                { verified: true },
                { merge: true }
              )
                .then(() => {
                  console.log("User verification status updated in Firestore.");
                })
                .catch((error) => {
                  console.error("Error updating verification status: ", error);
                });
            } else {
              console.log("Email not verified. Please verify your email.");
            }
          })
          .catch((error) => {
            console.error("Error reloading user data: ", error);
          });
      }
    });

    return () => unsubscribe();
  }, [auth, db, doc, setDoc, navigate]);

  return <p>Verification email sent to the email you provided</p>;
}
