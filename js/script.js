import { contactList } from "./data.js";
import { getIndex } from "./data.js";
const dt = luxon.DateTime;
const { createApp } = Vue;

const miaApp = createApp({
  data() {
    return {
      contacts: contactList,
      activeIndex: 1,
      msg: "",
      searching: "",
      messageIndex: null,
      showChat: false,
    };
  },
  methods: {
    // getIndex(id, array) {
    //   return array.findIndex((el) => el.id === id);
    // },
    isActive(id) {
      return id === this.activeIndex ? true : false;
    },
    // clicked(index) {
    //   this.activeIndex = index;
    // },
    // // selectContact(id) {
    // //   index = getIndex(id, this.contacts);
    // //   if (index !== -1) {
    // //     this.activeIndex = index;
    // //   }
    // // },
    sendMsg() {
      if (this.msg.trim() !== "") {
        this.contacts[this.contactIndex].messages.push({
          date: dt
            .now()
            .setLocale("it")
            .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
          message: this.msg,
          status: "sent",
        });
        this.msg = "";
        setTimeout(
          () =>
            this.contacts[this.contactIndex].messages.push({
              date: dt
                .now()
                .setLocale("it")
                .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
              message: "ok",
              status: "received",
            }),
          1000
        );
      }
    },
    searchFilter() {
      return this.contacts.filter((el) =>
        el.name.toLowerCase().includes(this.searching.toLowerCase())
      );
    },
    // selectIndex(index) {
    //   if (this.messageIndex !== index) {
    //     this.messageIndex = index;
    //   } else {
    //     this.messageIndex = null;
    //   }
    // },
    deleteMex(index) {
      this.contacts[this.contactIndex].messages.splice(index, 1);
    },
    returnHourMinute(date) {
      return date.slice(11, 16);
    },
    getLastMessage(id) {
      const contact = this.contacts.find((contact) => contact.id === id);
      const len = contact.messages.length;
      if (len > 0) {
        return contact.messages[len - 1].message;
      } else {
        return "";
      }
    },
    getLastAccess(id) {
      const contact = this.contacts.find((contact) => contact.id === id);
      const len = contact.messages.length;
      if (len > 0) {
        return contact.messages[len - 1].date;
      } else {
        return "";
      }
    },
  },
  computed: {
    // activeContact() {
    //   return this.contacts[this.activeIndex];
    // },
    contactIndex() {
      return getIndex(this.activeIndex, this.contacts);
    },
    lastDate() {
      const len = this.contacts[this.contactIndex].messages.length;
      if (len > 0) {
        return this.contacts[this.contactIndex].messages[len - 1].date;
      } else {
        return "";
      }
    },
  },
});

miaApp.mount("#app");
