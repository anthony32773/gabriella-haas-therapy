<template>
  <div>
    <PageSubHeader v-if="section.SectionHeader" :header="section.SectionHeader" />
    <span v-for="(entry, entryIndex) in section.SectionEntries" :key="entryIndex">
      <p
        v-if="entry.SectionType === 'Paragraph'"
        :class="entryIndex === section.SectionEntries.length - 1 ? '' : 'mb-4'">
        {{ entry.SectionContent }}
      </p>
      <v-row v-else-if="entry.SectionType === 'List'">
        <v-col
          v-for="(item, itemIndex) in entry.SectionContent"
          :key="itemIndex"
          cols="12"
          xl="6"
          lg="6"
          md="6"
          sm="12"
          class="d-flex flex-column w-100">
          <ul>
            <li class="ml-6">{{ item }}</li>
          </ul>
        </v-col>
      </v-row>
      <p v-else-if="entry.SectionType === 'Notice'" class="mt-4">
        <span class="font-weight-bold" style="color: lightskyblue">{{
          (entry.SectionContent as Notice).BoldText
        }}</span
        >{{ ` ${(entry.SectionContent as Notice).Note}` }}
      </p>
      <v-row v-else class="d-flex justify-center">
        <v-col
          v-for="service in entry.SectionContent"
          :key="(service as Service).name"
          class="d-flex justify-center"
          xl="4"
          lg="4"
          md="6"
          sm="12"
          cols="12">
          <v-card
            link
            to="/contact"
            width="375px"
            height="460px"
            class="mx-auto card-font"
            @click="navigateTo('/contact')">
            <v-img
              :src="(service as Service).image"
              :alt="(service as Service).altImage"
              height="175px"
              cover />
            <div style="height: 235px">
              <v-card-title class="text-center font-weight-bold"
                ><v-icon :icon="(service as Service).icon" /><v-spacer />{{
                  (service as Service).name
                }}</v-card-title
              >
              <h3 class="text-h3 text-center font-weight-bold">
                {{ generatePriceStrings((service as Service).variations) }}
              </h3>
              <p
                v-if="(service as Service).variations[0].price !== 0 && (service as Service).variations.length > 1"
                class="text-center font-weight-bold"
                style="font-size: 14px">
                Plus HST
              </p>
              <v-spacer v-else style="height: 21px" />
              <v-card-text class="text-center font-weight-bold">{{
                (service as Service).description
              }}</v-card-text>
            </div>
            <v-divider />
            <v-card-actions class="d-flex align-center">
              <v-btn
                color="blue"
                variant="text"
                block
                @click="navigateTo('/contact')"
                style="font-size: x-large !important"
                >Book Now</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </span>
  </div>
</template>

<script setup lang="ts">
  import type { Notice, SectionV2 } from "~/types/pageTypes";
  import type { Service, SubService } from "~/types/serviceTypes";
  defineProps<{
    section: SectionV2;
  }>();

  /**
   * Generate price range based on price of all services
   * @param {SubService[]} variations - List of services
   * @returns {number[]}
   */
  function generatePriceRange(variations: SubService[]): number[] {
    variations.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
    return [variations[0].price, variations[variations.length - 1].price];
  }

  /**
   * Generate price string to display on the cards
   * @param {SubService[]} variations - List of services
   * @returns {string}
   */
  function generatePriceStrings(variations: SubService[]): string {
    if (variations.length > 1) {
      const range = generatePriceRange(variations);
      return `$${range[0]} - $${range[1]}`;
    } else {
      return `$${variations[0].price}`;
    }
  }
</script>

<style scoped></style>
