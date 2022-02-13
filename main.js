const inquirer = require("inquirer");

const init = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What's your first name",
      },
    ]);

    console.log("Answer : ", answer);
  } catch (err) {
    console.log("Err ocurred while asking a question", err);
  }
};
init();
