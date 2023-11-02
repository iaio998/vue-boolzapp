import { contactList } from "./data.js";

const { createApp } = Vue;

const miaApp = createApp({
  data() {
    return {
      contacts: contactList,
    };
  },
  methods: {},
  computed: {},
});

miaApp.mount("#app");
