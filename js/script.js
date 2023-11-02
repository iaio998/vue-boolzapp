import { contactList } from "./data.js";

const { createApp } = Vue;

const miaApp = createApp({
  data() {
    return {
      contacts: contactList,
      activeIndex: 0,
    };
  },
  methods: {
    getIndex(id, array) {
      return array.finIndex((el) => el.id === id);
    },
    clicked(index) {
      this.activeIndex = index;
    },
  },
  computed: {},
});

miaApp.mount("#app");
