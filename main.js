const inquirer = require("inquirer");
const { getConnection, closeConnection } = require("./config/connection");

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

const getDepartmentChoices = async () => {
  const departments = await getDepartments();
  const departmentChoices = departments.map((d) => {
    return { name: d.name, value: d.id };
  });
  return departmentChoices;
};

const getRolesChoices = async () => {
  const roles = await getRoles();
  const rolesChoices = roles.map((d) => {
    return { name: d.title, value: d.id };
  });
  return rolesChoices;
};

const geManagersChoices = async () => {
  const managers = await getEmployees();
  const managerChoices = managers.map((d) => {
    return { name: d.first_name + " " + d.last_name, value: d.id };
  });
  return managerChoices;
};

const addEmployee = async () => {
  // Get role choices
  const roleChoices = await getRolesChoices();

  // Get role choices
  const managerChoices = await geManagersChoices();

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
      type: "list",
      name: "role_id",
      message: "Chose a role",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Chose a manager",
      choices: managerChoices,
    },
  ]);

  try {
    // Create an employee
    const conn = await getConnection();
    const [rows, fields] = await conn.execute(
      `insert into employee (first_name, last_name, role_id, manager_id)  values ("${answer.first_name}", "${answer.last_name}", ${answer.role_id}, ${answer.manager_id})`
    );
    console.log("Employee created successfully!");
  } catch (err) {
    console.log("Couldn't create an employee.", err);
  }
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
          await closeConnection();
      }
    } catch (err) {
      console.log("Err ocurred while asking a question", err);
    }
  }
};

init();
