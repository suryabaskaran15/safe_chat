import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase_db";

export async function getUserDetails(userName){
    const dbResponse = await getDocs(
      query(
        collection(db, "user"),
        where("userName", "==", userName)
      )
    );
    let response;
    dbResponse.forEach((doc) => {
      response = doc.data()
    });
    return response;
  };