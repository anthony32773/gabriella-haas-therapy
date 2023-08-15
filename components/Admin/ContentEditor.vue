<template>
  <div>
    <h1 class="text-center">Content Editor</h1>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(page, pageIndex) in content"
        :key="page.PageKey"
        :title="page.PageKey">
        <v-expansion-panel-text>
          <v-form v-model="formStatuses[pageIndex]" @submit.prevent>
            <v-text-field v-model="page.PageTitle" label="Page Title" />
            <div v-for="(section, index) in page.Sections" :key="index">
              <v-list-subheader>{{ `Section ${index + 1}` }}</v-list-subheader>
              <v-divider class="mb-4" />
              <v-text-field v-model="section.SectionHeader" label="Section Header" />
              <div
                v-for="(sectionEntry, sectionIndex) in section.SectionEntries"
                :key="sectionIndex">
                <span v-if="sectionEntry.SectionType === 'Paragraph'">
                  <v-textarea
                    v-if="!mdAndDown"
                    v-model="sectionEntry.SectionContent"
                    label="Section Entry Content"
                    :rules="[required(sectionEntry.SectionContent as string, 'Section Entry Content')]">
                    <template #append>
                      <span class="d-flex flex-column justify-center h-100">
                        <v-btn
                          color="error"
                          @click="activateConfirmDialog(pageIndex, index, sectionIndex)"
                          >Delete This Entry?</v-btn
                        >
                      </span>
                    </template>
                  </v-textarea>
                  <span v-else class="d-flex flex-column mb-4">
                    <v-textarea
                      v-model="sectionEntry.SectionContent"
                      label="Section Entry Content"
                      :rules="[required(sectionEntry.SectionContent as string, 'Section Entry Content')]" />
                    <v-btn
                      block
                      color="error"
                      @click="activateConfirmDialog(pageIndex, index, sectionIndex)"
                      >Delete This Entry?</v-btn
                    >
                  </span>
                </span>
                <v-row v-else-if="sectionEntry.SectionType === 'List'" class="mb-4">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                    <v-list>
                      <v-list-subheader>Section Entry List</v-list-subheader>
                      <v-list-item
                        v-for="(listEntry, listIndex) in sectionEntry.SectionContent"
                        :key="listIndex">
                        <v-list-item-title style="white-space: normal">{{
                          listEntry
                        }}</v-list-item-title>
                        <template #append>
                          <v-list-item-action end>
                            <v-btn
                              variant="text"
                              icon
                              @click="
                                editListItem(
                                  listEntry,
                                  'Edit List Item',
                                  pageIndex,
                                  index,
                                  sectionIndex,
                                  listIndex
                                )
                              "
                              ><v-icon icon="mdi:mdi-pencil" /><v-tooltip
                                activator="parent"
                                location="top"
                                >Edit</v-tooltip
                              ></v-btn
                            >
                            <v-btn
                              variant="text"
                              icon
                              color="error"
                              @click="
                                activateConfirmDialog(pageIndex, index, sectionIndex, listIndex)
                              "
                              ><v-icon icon="mdi:mdi-close" /><v-tooltip
                                activator="parent"
                                location="top"
                                >Delete</v-tooltip
                              ></v-btn
                            ></v-list-item-action
                          >
                        </template>
                      </v-list-item>
                    </v-list>
                    <v-btn
                      block
                      prepend-icon="mdi:mdi-plus"
                      @click="
                        editListItem(
                          '',
                          'New List Item',
                          pageIndex,
                          index,
                          sectionIndex,
                          (sectionEntry.SectionContent as string[]).length
                        )
                      "
                      >Add List Item</v-btn
                    >
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="d-flex justify-center">
                    <v-btn
                      :block="mdAndDown"
                      color="error"
                      prepend-icon="mdi:mdi-close"
                      class="align-self-center"
                      @click="activateConfirmDialog(pageIndex, index, sectionIndex)"
                      >Delete This Entry?</v-btn
                    >
                  </v-col>
                </v-row>
                <div v-else-if="sectionEntry.SectionType === 'Service'">
                  <div
                    v-for="(service, serviceIndex) in (sectionEntry.SectionContent as Service[])"
                    :key="serviceIndex">
                    <v-list-subheader>Service Entry</v-list-subheader>
                    <v-text-field v-model="service.name" label="Service Name" />
                    <v-text-field v-model="service.description" label="Service Description" />
                    <v-row>
                      <v-col
                        v-for="(variation, variationIndex) in service.variations"
                        :key="variationIndex"
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4">
                        <v-card>
                          <v-card-title>Variation {{ variationIndex + 1 }}</v-card-title>
                          <v-card-text>
                            <v-text-field
                              v-model="variation.time"
                              label="Time"
                              type="number"
                              :suffix="variation.unit"
                              :rules="[
                                required(variation.time.toString(), 'Time'),
                                isValidInt(variation.time.toString(), 'Time', 0, 1000),
                              ]" />
                            <v-text-field
                              v-model="variation.price"
                              type="number"
                              label="Price"
                              prefix="$"
                              :rules="[
                                required(variation.price.toString(), 'Price'),
                                isValidInt(variation.price.toString(), 'Price', 0, 10000),
                              ]" />
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </div>
                <span v-else>
                  <v-list-subheader>Section Entry Notice - Note for Insurance</v-list-subheader>
                  <v-row>
                    <v-col cols="12" sm="12" md="12" lg="2" xl="2">
                      <v-text-field
                        v-model="(sectionEntry.SectionContent as Notice).BoldText"
                        label="Bold Text Before Notice" />
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="10" xl="10">
                      <v-textarea
                        v-if="!mdAndDown"
                        v-model="(sectionEntry.SectionContent as Notice).Note"
                        label="Section Entry Notice Content" />
                    </v-col>
                  </v-row>
                </span>
              </div>
              <span class="d-flex justify-center mt-4">
                <v-menu transition="slide-y-transition">
                  <template #activator="{ props }">
                    <v-btn
                      color="primary"
                      :block="mdAndDown"
                      :width="mdAndDown ? '100%' : '25%'"
                      v-bind="props"
                      prepend-icon="mdi:mdi-plus"
                      >Add Section Entry</v-btn
                    >
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, i) in ['Paragraph', 'List']"
                      :key="i"
                      @click="
                        section.SectionEntries.push({
                          SectionType: item as 'Paragraph' | 'List',
                          SectionContent: item === 'Paragraph' ? '' : [],
                        })
                      ">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </span>
            </div>
            <v-divider class="mt-8 mb-4" />
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="12" sm="12" class="d-flex justify-center">
                <v-btn
                  :block="mdAndDown"
                  color="yellow"
                  prepend-icon="mdi:mdi-plus"
                  :width="mdAndDown ? '100%' : '75%'"
                  @click="page.Sections.push({ SectionHeader: '', SectionEntries: [] })"
                  >Add a New Section</v-btn
                >
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="12" sm="12" class="d-flex justify-center">
                <v-btn
                  type="submit"
                  :block="mdAndDown"
                  color="blue"
                  :width="mdAndDown ? '100%' : '75%'"
                  @click="updateContent(pageIndex)"
                  >Update {{ page.PageKey }} Page</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog
      v-model="listDialog.dialog"
      width="400px"
      class="d-flex flex-column"
      content-class="elevation-0">
      <v-card height="300px">
        <v-card-title>
          <h5>{{ listDialog.dialogTitle }}</h5>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="listDialog.text" />
        </v-card-text>
        <v-card-actions>
          <v-row class="ma-0 pa-0">
            <v-col cols="6" class="d-flex justify-center">
              <v-btn color="error" variant="outlined" @click="listDialog.dialog = false"
                >Cancel</v-btn
              >
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn
                color="success"
                variant="outlined"
                :disabled="!listDialog.text.length"
                @click="updateListItem"
                >Save</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <AdminDeleteConfirm
      :activate="deleteConfirmDialog"
      :message="deleteConfirmMessage"
      @confirm="deleteConfirm" />
  </div>
</template>

<script setup lang="ts">
  import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
  import { useDisplay } from "vuetify/lib/framework.mjs";
  import { Service } from "~/types/serviceTypes";
  import { Notice, PageV2 } from "~/types/pageTypes";
  import { required, isValidInt } from "~/utils/InputRules";
  import { useAdminSnackBarStore } from "~/stores/useAdminSnackBarStore";

  const { mdAndDown } = useDisplay();
  const adminSnackBar = useAdminSnackBarStore();
  const db = useFirestore();
  const content: PageV2[] = reactive([]);
  const formStatuses: boolean[] = reactive([]);
  const listDialog = reactive({
    dialogTitle: "",
    dialog: false,
    text: "",
    pageIndex: 0,
    sectionIndex: 0,
    sectionEntryIndex: 0,
    sectionListIndex: 0,
  });
  const idMap: Map<string, string> = new Map<string, string>();
  const deleteConfirmDialog = ref(false);
  const deleteConfirmMessage = ref("");
  const currentSectionToDelete = reactive({
    pageIndex: -1,
    sectionIndex: -1,
    sectionEntryIndex: -1,
    listIndex: -1,
  });

  onMounted(async () => {
    await getContent();
  });

  /**
   * Activates the confirm delete dialog box.
   * @param {number} pageIndex
   * @param {number} sectionIndex
   * @param {number} sectionEntryIndex
   * @param {number} [listIndex = -1]
   * @returns {void}
   */
  function activateConfirmDialog(
    pageIndex: number,
    sectionIndex: number,
    sectionEntryIndex: number,
    listIndex = -1
  ): void {
    currentSectionToDelete.pageIndex = pageIndex;
    currentSectionToDelete.sectionIndex = sectionIndex;
    currentSectionToDelete.sectionEntryIndex = sectionEntryIndex;
    if (listIndex === -1) {
      deleteConfirmMessage.value = "Are you sure you want to delete this section entry?";
    } else {
      currentSectionToDelete.listIndex = listIndex;
      deleteConfirmMessage.value = "Are you sure you want to delete this list entry?";
    }
    deleteConfirmDialog.value = true;
  }

  /**
   * Handle confirming the deletion of a section or list entry
   * @param {boolean} confirm
   * @returns {void}
   */
  function deleteConfirm(confirm: boolean): void {
    deleteConfirmDialog.value = false;
    if (confirm) {
      deleteSectionEntry();
    }
  }

  /**
   * Delete a entry from a section
   * @returns {void}
   */
  function deleteSectionEntry(): void {
    if (currentSectionToDelete.listIndex === -1) {
      content[currentSectionToDelete.pageIndex].Sections[
        currentSectionToDelete.sectionIndex
      ].SectionEntries.splice(currentSectionToDelete.sectionEntryIndex, 1);
      if (
        !content[currentSectionToDelete.pageIndex].Sections[currentSectionToDelete.sectionIndex]
          .SectionEntries.length
      ) {
        content[currentSectionToDelete.pageIndex].Sections.splice(
          currentSectionToDelete.sectionIndex,
          1
        );
      }
    } else {
      (
        content[currentSectionToDelete.pageIndex].Sections[currentSectionToDelete.sectionIndex]
          .SectionEntries[currentSectionToDelete.sectionEntryIndex].SectionContent as string[]
      ).splice(currentSectionToDelete.listIndex, 1);
      if (
        !(
          content[currentSectionToDelete.pageIndex].Sections[currentSectionToDelete.sectionIndex]
            .SectionEntries[currentSectionToDelete.sectionEntryIndex].SectionContent as string[]
        ).length
      ) {
        content[currentSectionToDelete.pageIndex].Sections[
          currentSectionToDelete.sectionIndex
        ].SectionEntries.splice(currentSectionToDelete.sectionEntryIndex, 1);
      }
      if (
        !content[currentSectionToDelete.pageIndex].Sections[currentSectionToDelete.sectionIndex]
          .SectionEntries.length
      ) {
        content[currentSectionToDelete.pageIndex].Sections.splice(
          currentSectionToDelete.sectionIndex,
          1
        );
      }
    }
    currentSectionToDelete.pageIndex = -1;
    currentSectionToDelete.sectionIndex = -1;
    currentSectionToDelete.sectionEntryIndex = -1;
    currentSectionToDelete.listIndex = -1;
  }

  /**
   * Update a list entry
   *
   * @returns {void}
   */
  function updateListItem(): void {
    (
      content[listDialog.pageIndex].Sections[listDialog.sectionIndex].SectionEntries[
        listDialog.sectionEntryIndex
      ].SectionContent as string[]
    )[listDialog.sectionListIndex] = listDialog.text;
    listDialog.dialog = false;
  }

  /**
   * Open and setup the edit list entry dialog box
   * @param {string} text
   * @param {number} pageIndex - Index of the page
   * @param {number} sectionIndex - Index of the section
   * @param {number} sectionEntryIndex - Index of the section entry
   * @param {number} sectionListIndex - Index of the item in the list of the section entry
   * @returns {void}
   */
  function editListItem(
    text: string,
    dialogTitle: string,
    pageIndex: number,
    sectionIndex: number,
    sectionEntryIndex: number,
    sectionListIndex: number
  ): void {
    listDialog.dialogTitle = dialogTitle;
    listDialog.text = text;
    listDialog.pageIndex = pageIndex;
    listDialog.sectionIndex = sectionIndex;
    listDialog.sectionEntryIndex = sectionEntryIndex;
    listDialog.sectionListIndex = sectionListIndex;
    listDialog.dialog = true;
  }

  /**
   * Retrieve the site content from the DB for editing
   * @returns {Promise<void>}
   */
  async function getContent(): Promise<void> {
    try {
      const snapshot = await getDocs(collection(db, "content"));
      snapshot.forEach((doc) => {
        content.push(doc.data() as PageV2);
        idMap.set(content[content.length - 1].PageKey, doc.id);
        formStatuses.push(false);
      });
      content.sort((a, b) => {
        const pageA = a.PageKey.toUpperCase();
        const pageB = b.PageKey.toUpperCase();
        if (pageA < pageB) {
          return -1;
        }
        if (pageA > pageB) {
          return 1;
        }
        return 0;
      });
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: "Something went wrong fetching the site content! Please try again.",
      });
    }
  }

  /**
   * Updates the specific content section
   * @param {number} index - Index of the content section
   * @returns {Promise<void>}
   */
  async function updateContent(index: number): Promise<void> {
    if (formStatuses[index]) {
      const pageDoc = doc(db, "content", idMap.get(content[index].PageKey) as string);
      try {
        await updateDoc(pageDoc, content[index]);
      } catch (err) {
        adminSnackBar.openSnackBar(
          "There was an error updating this content! Please try again.",
          "error"
        );
      }
      adminSnackBar.openSnackBar("Updated content successfully!", "success");
    } else {
      adminSnackBar.openSnackBar("Some inputs have errors!", "error");
    }
  }
</script>
