const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");
const colors = require("./utils/colors");

const { consoleTable } = require("./utils/terminal");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(colors.error(`Reading error: ${err.message}`));
      return;
    }
    const contacts = JSON.parse(data);

    consoleTable("Contacts list:", contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(colors.error(`Reading error: ${err.message}`));
      return;
    }
    const contacts = JSON.parse(data);

    const contactById = contacts.find(({ id }) => id === contactId);

    if (!contactById) {
      console.log(
        colors.error(`Contact with ID ${colors.data(contactId)} was not found.`)
      );
      return;
    }

    consoleTable("Contact by id:", [contactById]);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(colors.error(`Reading error: ${err.message}`));
      return;
    }
    const contacts = JSON.parse(data);

    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) {
      console.log(
        colors.error(`Contact with ID ${colors.data(contactId)} was not found.`)
      );
      return;
    }

    const removedContact = contacts.splice(contactIndex, 1);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log(colors.error(`Reading error: ${err.message}`));
        return;
      }

      consoleTable("Contact removed successfully.", removedContact);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(colors.error(`Reading error: ${err.message}`));
      return;
    }
    const contacts = JSON.parse(data);

    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log(colors.error(`Reading error: ${err.message}`));
        return;
      }

      consoleTable(`Contact added successfully.`, [newContact]);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  colors,
};
