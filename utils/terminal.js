const colors = require("./colors");

function consoleTable(heading, tableData) {
  console.log(colors.accent(heading));
  console.table(tableData);
}

function helperMessage(action) {
  let message = "";
  const helpMessage = {
    id: "-i, --id <type>  user id",
    add: [
      "-n, --name <type>    user name\n",
      "-e, --email <type>   user email\n",
      "-p, --phone <type>   user phone\n",
    ],
  };
  const isIdAction = action === "get" || action === "remove";
  const isAddAction = action === "add";

  if (!isIdAction && !isAddAction) return;

  if (isIdAction) {
    message = helpMessage.id;
  }
  if (isAddAction) {
    message = helpMessage.add.join("  ");
  }
  console.log(
    `${colors.help(
      `When using ${colors.data(action)}, you must provide:`
    )}\n${colors.input(`Options:\n  ${message}`)}`
  );
}

module.exports = {
  consoleTable,
  helperMessage,
};
