const inquirer = require("inquirer");

const showEmployees = async () => {
  console.log("Showing all the employees");
};

const init = async () => {
  let shouldExit = true;

  while (shouldExit) {
    try {
      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "What do you want to do?",
          choices: [
            { value: 1, name: "Show all the employees" },
            { value: 2, name: "Show all the roles" },
            { value: 3, name: "Show all the departments" },
            { value: 4, name: "Exit" },
          ],
        },
      ]);

      //process the answers
      switch (answer.choice) {
        case 1: // show all employees;
          await showEmployees();
          break;
        case 2: // show all roles;
          break;
        case 3: // show all departments;
          break;
        case 4: // exit
        default:
          shouldExit = false;
      }
    } catch (err) {
      console.log("Err ocurred while asking a question", err);
    }
  }
};

init();
