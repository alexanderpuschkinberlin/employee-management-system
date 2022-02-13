const inquirer = require("inquirer");
const db = require("./config/connection");

const getConnection = async () => {
  return await db;
};

const printInfo = (rows) => {
  console.table(rows);
};

const getEmployees = async () => {
  const conn = await getConnection();
  const [rows, fields] = await conn.execute(
    "SELECT e.id, e.first_name, e.last_name, r.title, m.first_name as manager FROM employee e, role r, employee m where e.role_id = r.id and e.manager_id = m.id"
  );
  return rows;
};

const getDepartments = async () => {
  const conn = await getConnection();
  const [rows, fields] = await conn.execute("SELECT id, name from department");
  return rows;
};

const getRoles = async () => {
  const conn = await getConnection();
  const [rows, fields] = await conn.execute(
    "Select r.id, r.title, r.salary, d.name from role r, department d where r.department_id = d.id"
  );
  return rows;
};

const addEmployee = async () => {
  const conn = await getConnection();

  //first name, lastname, role, manager
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name",
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the role id",
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the manager id",
    },
  ]);
  console.log(answer);
};

const closeDB = async () => {
  const conn = await getConnection();
  await conn.end();
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
            { value: 4, name: "Add an emplyee" },
            { value: 9, name: "Exit" },
          ],
        },
      ]);

      //process the answers
      let rows;
      switch (answer.choice) {
        case 1: // show all employees;
          rows = await getEmployees();
          printInfo(rows);
          break;

        case 2: // show all roles;
          rows = await getRoles();
          printInfo(rows);
          break;

        case 3: // show all departments;
          rows = await getDepartments();
          printInfo(rows);
          break;

        case 4: // add an employee
          await addEmployee();
          break;

        case 9: // exit
        default:
          shouldExit = false;
          await closeDB();
      }
    } catch (err) {
      console.log("Err ocurred while asking a question", err);
    }
  }
};

init();
