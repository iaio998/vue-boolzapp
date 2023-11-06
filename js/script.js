import { contactList } from "./data.js";
const dt = luxon.DateTime;
const { createApp } = Vue;

const miaApp = createApp({
  data() {
    return {
      contacts: contactList,
      activeIndex: 0,
      msg: "",
      searching: "",
    };
  },
  methods: {
    getIndex(id, array) {
      return array.finIndex((el) => el.id === id);
    },
    clicked(index) {
      this.activeIndex = index;
    },
    // selectContact(id) {
    //   index = getIndex(id, this.contacts);
    //   if (index !== -1) {
    //     this.activeIndex = index;
    //   }
    // },
    sendMsg() {
      if (this.msg !== "") {
        const msg = this.msg;
        this.contacts[this.activeIndex].messages.push({
          date: dt.now().setLocale("it").toLocaleString(dt.TIME_SIMPLE),
          message: msg,
          status: "sent",
        });
        this.msg = "";
        setTimeout(
          () =>
            this.contacts[this.activeIndex].messages.push({
              date: dt.now().setLocale("it").toLocaleString(dt.TIME_SIMPLE),
              message: "ok",
              status: "received",
            }),
          1000
        );
      }
    },
    searchFilter() {
      const filtered = this.contacts.filter((el) => {
        return el.name.toLowerCase().includes(this.searching.toLowerCase());
      });
      return filtered;
    },
    // getLastMessage(id) {
    //   const contact = this.contacts.find((contact) => contact.id === id);
    //   const len = contact.messages.length;
    //   if (len > 0) {
    //     return contact.messages[len - 1].message;
    //   } else {
    //     return "";
    //   }
    // },
    // getLastAccess(id) {
    //   const contact = this.contacts.find((contact) => contact.id === id);
    //   const len = contact.messages.length;
    //   if (len > 0) {
    //     return contact.messages[len - 1].date;
    //   } else {
    //     return "";
    //   }
    // },
  },
  computed: {
    activeContact() {
      return this.contacts[this.activeIndex];
    },
    contactIndex() {
      return getIndex(this.activeIndex, this.contacts);
    },
    // lastDate() {
    //   const len = this.activeContact.messages.length;
    //   if (len > 0) {
    //     return this.activeContact.messages[len - 1].date;
    //   } else {
    //     return "";
    //   }
    // },
  },
});

miaApp.mount("#app");
