import { DocumentData, QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { PageV2 } from "~/types/pageTypes";

export default async function getData(pageKey: string): Promise<PageV2> {
  const db = useFirestore();
  const contentRef = collection(db, "content");
  const contentQuery = query(contentRef, where("PageKey", "==", pageKey));
  let snapshot: undefined | QuerySnapshot<DocumentData>;
  try {
    snapshot = (await getDocs(contentQuery)) as QuerySnapshot<DocumentData>;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch website content. Please try again later",
      fatal: true,
    });
  }
  if (snapshot.empty) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch website content. Please try again later",
      fatal: true,
    });
  }
  return snapshot?.docs[0].data() as PageV2;
}
