<template>
  <div v-if="dataLoaded">
    <PageTitle :title="content.PageTitle" class="mb-8 text-center" />
    <v-form ref="contactForm" validate-on="submit" @submit.prevent>
      <v-row>
        <v-col cols="12" xl="6" lg="6" md="12" sm="12" class="py-1">
          <v-text-field
            v-model="firstName"
            label="First Name"
            variant="outlined"
            :rules="[
              formValidation.required(firstName, 'First Name'),
              formValidation.counter(firstName, 'First Name', 100),
              formValidation.isValidAlpha(firstName, 'First Name'),
            ]"
            @keyup.enter="submitForm" />
        </v-col>
        <v-col cols="12" xl="6" lg="6" md="12" sm="12" class="py-1">
          <v-text-field
            v-model="lastName"
            label="Last Name"
            variant="outlined"
            :rules="[
              formValidation.required(lastName, 'Last Name'),
              formValidation.counter(lastName, 'Last Name', 100),
              formValidation.isValidAlpha(lastName, 'Last Name'),
            ]"
            @keyup.enter="submitForm" />
        </v-col>
        <v-col cols="12" xl="6" lg="6" md="12" sm="12" class="py-1">
          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            type="email"
            :rules="[
              formValidation.required(email, 'Email'),
              formValidation.counter(email, 'Email', 100),
              formValidation.isValidEmail,
            ]"
            @keyup.enter="submitForm" />
        </v-col>
        <v-col cols="12" xl="6" lg="6" md="12" sm="12" class="py-1">
          <v-text-field
            v-model="phoneNumber"
            label="Phone Number"
            variant="outlined"
            type="tel"
            :rules="[
              formValidation.required(phoneNumber, 'Phone Number'),
              formValidation.counter(phoneNumber, 'Phone Number', 10),
              formValidation.isValidPhoneNumber,
            ]"
            @keyup.enter="submitForm" />
        </v-col>
        <v-col cols="12" class="py-1">
          <v-text-field
            v-model="subject"
            label="Subject"
            variant="outlined"
            :rules="[
              formValidation.required(subject, 'Subject'),
              formValidation.counter(subject, 'Subject', 100),
              formValidation.isValidAlpha(subject, 'Subject'),
            ]"
            @keyup.enter="submitForm" />
        </v-col>
        <v-col cols="12" class="py-1">
          <v-textarea
            v-model="message"
            label="Message"
            variant="outlined"
            :rules="[
              formValidation.required(message, 'Message'),
              formValidation.counter(message, 'Message', 4000),
              formValidation.isValidAscii(message, 'Message'),
            ]" />
        </v-col>
      </v-row>
      <span class="d-flex justify-center">
        <v-btn
          style="font-size: x-large !important"
          color="blue"
          variant="outlined"
          type="submit"
          class="mt-4"
          :block="smAndDown"
          :disabled="disableSubmit"
          @click="submitForm"
          >Submit</v-btn
        >
      </span>
    </v-form>
    <span class="d-flex justify-center mt-4">
      <v-progress-circular v-if="activateLoader" indeterminate color="blue" class="text-center" />
    </span>
    <div id="recaptcha"></div>
    <v-snackbar v-model="snackBarActivate" color="success" timeout="5000"
      >{{ snackBarMessage }}
      <template #actions>
        <v-btn color="white" variant="text" @click="snackBarActivate = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
  import { addDoc, collection, Timestamp } from "firebase/firestore";
  import {
    browserSessionPersistence,
    deleteUser,
    setPersistence,
    signInAnonymously,
    signOut,
  } from "firebase/auth";
  import type { VForm } from "vuetify/lib/components";
  import { useDisplay } from "vuetify/lib/framework.mjs";
  import getData from "~/utils/getData";
  import * as formValidation from "~/utils/InputRules";
  import { PageV2 } from "types/pageTypes";

  useServerSeoMeta({
    title: "Contact Me",
    ogTitle: "Contact Me",
    description: "Contact Gabriella Haas",
    ogDescription: "Contact Gabriella Haas",
  });
  useHead({ title: "Contact Me" });
  const dataLoaded = ref(false);
  let content: PageV2 = {
    PageTitle: "",
    PageKey: "Contact Page",
    Sections: [],
  };
  onBeforeMount(async () => {
    content = await getData("Contact Page");
    dataLoaded.value = true;
  });

  const contactForm = ref<InstanceType<typeof VForm> | null>(null);
  const { smAndDown } = useDisplay();
  const firstName = ref("");
  const lastName = ref("");
  const email = ref("");
  const phoneNumber = ref("");
  const subject = ref("");
  const message = ref("");
  const snackBarActivate = ref(false);
  const snackBarMessage = ref("");
  const snackBarColour = ref("");
  const disableSubmit = ref(false);
  const activateLoader = ref(false);

  /**
   * Submit contact form logic
   *
   * @returns {Promise<void>}
   */
  async function submitForm(): Promise<void> {
    activateLoader.value = true;
    await nextTick(async () => {
      const validationCheck = await contactForm.value.validate();
      if (validationCheck.valid) {
        const db = useFirestore();
        try {
          await setPersistence(useFirebaseAuth()!, browserSessionPersistence);
          const tempUser = await signInAnonymously(useFirebaseAuth()!);
          const tempTimeStamp = Timestamp.now();
          const tempDate = tempTimeStamp.toDate();
          await addDoc(collection(db, "messages"), {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            subject: subject.value,
            to: "gabriella.psychotherapyservices@gmail.com",
            messageInput: message.value,
            dateAdded: tempTimeStamp,
            message: {
              subject: `${firstName.value} ${lastName.value} - ${
                subject.value
              } - ${tempDate.toDateString()} ${tempDate.toLocaleTimeString()}`,
              text: `${message.value}\n\n${firstName.value} ${lastName.value}\nPhone Number: ${phoneNumber.value}\nEmail: ${email.value}`,
            },
          });
          await signOut(useFirebaseAuth()!);
          await deleteUser(tempUser.user);
          snackBarMessage.value = "Thank you! I will respond to your email as soon as I can!";
          snackBarColour.value = "success";
        } catch (err) {
          snackBarMessage.value = "Something went wrong! Please refresh and try again.";
          snackBarColour.value = "error";
        }
        snackBarActivate.value = true;
        disableSubmit.value = true;
      }
    });
    activateLoader.value = false;
  }
</script>
