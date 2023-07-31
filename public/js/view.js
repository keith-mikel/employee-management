const inquirer = require('inquirer');
const axios = require('axios');

// Function to view the departments table
async function viewDepartments() {
  try {
    const response = await axios.get('http://localhost:3001/api/department');
    const departments = response.data;
    console.table(departments);
  } catch (error) {
    console.error('Error fetching departments:', error.response ? error.response.data.error : error.message);
  }
}

// Function to view the roles table
async function viewRoles() {
  try {
    const response = await axios.get('http://localhost:3001/api/role');
    const roles = response.data;
    console.table(roles);
  } catch (error) {
    console.error('Error fetching roles:', error.response ? error.response.data.error : error.message);
  }
}

// Function to view the employees table
async function viewEmployees() {
  try {
    const response = await axios.get('http://localhost:3001/api/employee');
    const employees = response.data;
    console.table(employees);
  } catch (error) {
    console.error('Error fetching employees:', error.response ? error.response.data.error : error.message);
  }
}

// Function to start the CLI and ask for user input
async function startViewCLI() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: [
        'View Departments',
        'View Roles',
        'View Employees',
        'Exit',
      ],
    },
  ]);

  switch (answers.action) {
    case 'View Departments':
      await viewDepartments();
      break;
    case 'View Roles':
      await viewRoles();
      break;
    case 'View Employees':
      await viewEmployees();
      break;
    case 'Exit':
      return;
    default:
      console.log('Invalid action.');
  }

  // Repeat until the user chooses to Exit
  await startViewCLI();
}



module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  startViewCLI,
};
