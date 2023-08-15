import {QuerySnapshot, getFirestore} from "firebase-admin/firestore";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {initializeApp} from "firebase-admin/app";
import * as logger from "firebase-functions/logger";

initializeApp();

export const messageCleanup = onSchedule("0 0 1 * *", async () => {
  const messageRef = getFirestore().collection("messages");
  const messages: QuerySnapshot = await messageRef.get();
  const todayDate = new Date();
  const dateString = todayDate.toDateString();
  if (!messages.empty) {
    const today = todayDate.getTime();
    const divider = 86400000;
    const idsToDelete: string[] = [];
    messages.forEach((message) => {
      const {dateAdded} = message.data();
      const messageDate: Date = dateAdded.toDate();
      const difference = Math.abs(today - messageDate.getTime()) / divider;
      if (difference > 30) {
        idsToDelete.push(message.id);
      }
    });
    if (idsToDelete.length) {
      for (let i = 0; i < idsToDelete.length; i++) {
        const docRef = messageRef.doc(idsToDelete[i]);
        try {
          await docRef.delete();
          logger.log("Deleted message", idsToDelete[i]);
        } catch (err) {
          logger.error("Deletion of message", idsToDelete[i], "failed:", err);
        }
      }
      logger.log(dateString, "Deleted", idsToDelete.length, "messages today");
    } else {
      logger.log(dateString, "- No messgaes to delete today.");
    }
  } else {
    logger.log(dateString, "- No messgaes to delete today.");
  }
});
