<template>
  <div class="d-flex justify-center align-center flex-column w-100" style="height: 75vh">
    <LoginNotification
      v-if="loginShowError"
      colour="amber-darken-3"
      :message="loginErrorMessage"
      :width="smAndDown ? '90%' : '40%'" />
    <v-card flat variant="outlined" :width="smAndDown ? '90%' : '40%'">
      <v-card-title
        class="w-100 d-flex flex-column justify-center align-center mt-1 font-weight-bold">
        <span style="box-sizing: border-box">
          <v-avatar color="white" size="x-large">
            <v-icon
              color="gray"
              icon="
                  mdi:mdi-login-variant
              " />
          </v-avatar>
        </span>
        Login
      </v-card-title>
      <v-spacer />
      <v-form ref="loginForm" validate-on="submit" @submit.prevent>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                prepend-inner-icon="mdi:mdi-email"
                :rules="[formValidation.required(email, 'Email'), formValidation.isValidEmail]"
                @keyup.enter="$emit('submit')" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="password"
                label="Password"
                variant="outlined"
                :type="showPasswordLogin ? 'text' : 'password'"
                prepend-inner-icon="mdi:mdi-lock"
                :append-inner-icon="showPasswordLogin ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off'"
                :rules="[formValidation.required(password, 'Password')]"
                @click:append-inner="showPasswordLogin = !showPasswordLogin"
                @keyup.enter="$emit('submit')" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center w-100">
          <v-btn
            color="blue"
            type="submit"
            variant="elevated"
            :block="smAndDown"
            :disabled="disableSubmit"
            @click="submitForm"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
    <span class="d-flex justify-center mt-4">
      <v-progress-circular v-if="activateLoader" indeterminate color="blue" class="text-center" />
    </span>
  </div>
</template>

<script setup lang="ts">
  import { useDisplay } from "vuetify/lib/framework.mjs";
  import type { VForm } from "vuetify/lib/components";
  import {
    Auth,
    browserSessionPersistence,
    setPersistence,
    signInWithEmailAndPassword,
    AuthError,
    signOut,
  } from "firebase/auth";
  import * as formValidation from "~/utils/InputRules";

  definePageMeta({
    layout: "login",
    middleware: [
      async function () {
        const user = await getCurrentUser();
        if (user) {
          return navigateTo("/admin/content");
        }
      },
    ],
  });
  useServerSeoMeta({
    title: "Gabriella Haas - Login",
    robots: {
      index: false,
      follow: false,
      noindex: true,
      nofollow: true,
      none: true,
      noarchive: false,
    },
  });
  const { smAndDown } = useDisplay();
  const email = ref("");
  const password = ref("");
  const showPasswordLogin = ref(false);
  const loginForm = ref<InstanceType<typeof VForm> | null>(null);
  const loginErrorMessage = ref("");
  const loginShowError = ref(false);
  const disableSubmit = ref(false);
  const activateLoader = ref(false);

  async function submitForm() {
    activateLoader.value = true;
    await nextTick(async () => {
      const validationCheck = await loginForm.value.validate();
      if (validationCheck.valid) {
        try {
          await setPersistence(useFirebaseAuth() as Auth, browserSessionPersistence);
          const user = await signInWithEmailAndPassword(
            useFirebaseAuth() as Auth,
            email.value,
            password.value
          );
          if (
            user.user.uid === "HxK8PKbWdTVquRYhLLtWI1kFhR13" ||
            user.user.uid === "hiuFiq6pHHeQ345JCxf64LnZtB62"
          ) {
            await navigateTo("/admin/content");
          } else {
            await signOut(useFirebaseAuth()!);
            throw createError({
              statusCode: 401,
              statusMessage: "You are not authorized to view this page.",
            });
          }
        } catch (err) {
          if (isNuxtError(err as any)) {
            createError({
              statusCode: 401,
              statusMessage: "You are not authorized to view this page.",
            });
          } else {
            const newErr = err as AuthError;
            if (newErr.code === "auth/user-not-found") {
              loginErrorMessage.value = "There was no account found with that email address.";
            } else if (newErr.code === "auth/wrong-password") {
              loginErrorMessage.value = "Your password is incorrect.";
            } else if (newErr.code === "auth/user-disabled") {
              await signOut(useFirebaseAuth()!);
              loginErrorMessage.value = "This account has been temporarily disabled.";
              disableSubmit.value = true;
            } else if (newErr.code === "auth/invalid-email") {
              loginErrorMessage.value = "The email does not match a valid account.";
            } else if (newErr.code === "auth/too-many-requests") {
              loginErrorMessage.value =
                "Too many unsuccessful login attempts. Please try again later.";
              disableSubmit.value = true;
            } else {
              throw createError({
                statusCode: 500,
                statusMessage: "An error occured signing in. Please refresh and try again.",
              });
            }
            loginShowError.value = true;
          }
        }
      }
    });
    activateLoader.value = false;
  }
</script>
