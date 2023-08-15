export const useAdminSnackBarStore = defineStore("adminSnackBar", {
  state: () => {
    return {
      active: false as boolean,
      message: "" as string,
      colour: "" as string,
    };
  },
  actions: {
    openSnackBar(message: string, colour: string): void {
      this.message = message;
      this.colour = colour;
      this.active = true;
    },
  },
});
