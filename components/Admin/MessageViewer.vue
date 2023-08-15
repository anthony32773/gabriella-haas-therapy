<template>
  <div>
    <h1 class="text-center">Message Viewer</h1>
    <h2 class="text-center">Total: {{ totalCount }}</h2>
    <div v-if="dataLoading">
      <v-row class="d-flex justify-center">
        <v-col v-for="(item, index) in 5" :key="index" cols="12" md="12" sm="12" lg="10" xl="10">
          <v-skeleton-loader type="list-item-three-line" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <v-infinite-scroll direction="vertical" @load="getMessages">
            <v-expansion-panels v-model="selectedPanel" variant="popout">
              <v-expansion-panel
                v-for="(message, index) in messages"
                :key="message.messageInput"
                :color="index % 2 === 0 ? '#FFFFFF' : '#bfbfbf'"
                :title="`${message.firstName} ${
                  message.lastName
                } - ${message.dateAdded.toDateString()}`">
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12">
                      <v-text-field
                        v-model="message.firstName"
                        :readonly="true"
                        label="First Name" />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12">
                      <v-text-field v-model="message.lastName" :readonly="true" label="Last Name" />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12">
                      <v-text-field v-model="message.email" :readonly="true" label="Email" />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12">
                      <v-text-field
                        v-model="message.phoneNumber"
                        :readonly="true"
                        label="Phone Number" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="message.subject" :readonly="true" label="Subject" />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="message.messageInput" :readonly="true" label="Message" />
                    </v-col>
                  </v-row>
                  <span class="d-flex justify-center">
                    <v-btn color="error" @click="activateConfirmDialog(index)">Delete?</v-btn>
                  </span>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-infinite-scroll>
        </v-col>
      </v-row>
    </div>
    <AdminDeleteConfirm
      :activate="deleteConfirmDialog"
      :message="'Are you sure you want to delete this message?'"
      @confirm="deleteConfirm" />
  </div>
</template>

<script setup lang="ts">
  import {
    DocumentData,
    QueryDocumentSnapshot,
    collection,
    deleteDoc,
    doc,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
  } from "firebase/firestore";
  import { MessageNoEmail } from "~/types/contactTypes";
  import { useAdminSnackBarStore } from "~/stores/useAdminSnackBarStore";

  const db = useFirestore();
  const messageRef = collection(db, "messages");
  const totalCount = ref(0);
  const messages: MessageNoEmail[] = reactive([]);
  const dataLoading = ref(false);
  const selectedPanel = ref(undefined);
  const idMap: Map<number, string> = new Map<number, string>();
  const adminSnackBar = useAdminSnackBarStore();
  const deleteConfirmDialog = ref(false);
  const currentDeleteIndex = ref(-1);

  let snapshot = undefined as any;

  type ScrollerEvent = {
    side: "end" | "start" | "both";
    done: (status: "error" | "loading" | "empty" | "ok") => void;
  };

  onMounted(async () => {
    await getCount();
    await getMessages();
    dataLoading.value = false;
  });

  /**
   * Retrieve the total count of the number of messages
   *
   * @returns {Promise<void>}
   */
  async function getCount(): Promise<void> {
    try {
      const countQuery = await getCountFromServer(collection(db, "messages"));
      totalCount.value = countQuery.data().count;
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage:
          "Could not retrieve the number of messages from the server. Please try again.",
      });
    }
  }

  /**
   * Activates the confirm delete dialog box.
   * @param {number} index
   * @returns {void}
   */
  function activateConfirmDialog(index: number): void {
    currentDeleteIndex.value = index;
    deleteConfirmDialog.value = true;
  }

  /**
   * Delete a message from the database
   * @returns {Promise<void>}
   */
  async function deleteMessage(): Promise<void> {
    try {
      await deleteDoc(doc(db, "messages", idMap.get(currentDeleteIndex.value) as string));
      await getCount();
      selectedPanel.value = undefined;
      idMap.delete(currentDeleteIndex.value);
      messages.splice(currentDeleteIndex.value, 1);
      adminSnackBar.openSnackBar("Message successfully deleted!", "success");
      currentDeleteIndex.value = -1;
    } catch (err) {
      adminSnackBar.openSnackBar("An error occurred deleting this message", "error");
    }
  }

  /**
   * Handle confirming the deletion of a message.
   * @param {boolean} confirm
   * @returns {Promise<void>}
   */
  async function deleteConfirm(confirm: boolean): Promise<void> {
    deleteConfirmDialog.value = false;
    if (confirm && currentDeleteIndex.value !== -1) {
      await deleteMessage();
    }
  }

  /**
   * Retrieve messages from the database
   * @param {ScrollerEvent} event
   * @returns {Promise<void>}
   */
  async function getMessages(event?: ScrollerEvent): Promise<void> {
    if (event) {
      if (messages.length === totalCount.value) {
        event.done("empty");
        return;
      }
    }
    let messageQuery: any;
    if (!snapshot) {
      dataLoading.value = true;
      messageQuery = query(messageRef, orderBy("dateAdded", "desc"), limit(10));
    } else {
      messageQuery = query(
        messageRef,
        orderBy("dateAdded", "desc"),
        startAfter(snapshot.docs[snapshot.docs.length - 1]),
        limit(10)
      );
    }

    try {
      snapshot = await getDocs(messageQuery);
      snapshot.forEach((tempMessage: QueryDocumentSnapshot<DocumentData>) => {
        const { firstName, lastName, email, phoneNumber, subject, messageInput, dateAdded } =
          tempMessage.data();
        const newDate = dateAdded.toDate();
        messages.push({
          firstName,
          lastName,
          email,
          phoneNumber,
          subject,
          messageInput,
          dateAdded: newDate,
        });
        idMap.set(messages.length - 1, tempMessage.id);
      });
      event?.done("ok");
    } catch (err) {
      adminSnackBar.openSnackBar(
        "Unable to fetch the current list of messages. Please refresh and try again.",
        "error"
      );
    }
  }
</script>
