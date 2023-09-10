const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} = require("./contacts");
const { Command } = require("commander");

const colors = require("./utils/colors");
const { helperMessage } = require("./utils/terminal");

const program = new Command();
program
  .requiredOption(
    "-a, --action <type>",
    'choose action (choices: "list", "get", "add", "remove")'
  )
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (!id) {
        helperMessage("get");
        return;
      }
      getContactById(id);
      break;

    case "add":
      if (!name || !email || !phone) {
        helperMessage("add");
        return;
      }
      addContact(name, email, phone);
      break;

    case "remove":
      if (!id) {
        helperMessage("remove");
        return;
      }
      removeContact(id);
      break;

    default:
      console.log(colors.error("Unknown action type!"));
  }
}

invokeAction(argv);
