const inquirer = require('inquirer');
const axios = require('axios');

// Function to add a new department to the database
async function addDepartment() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:',
    },
  ]);

  try {
    const response = await axios.post('http://localhost:3001/api/department', { name: answers.name });
    console.log(response.data.message);
    console.log('Department Information:', response.data.department);
  } catch (error) {
    console.error('Error adding department:', error.response ? error.response.data.error : error.message);
  }
}

// Function to add a new role to the database
async function addRole() {
  const departments = await axios.get('http://localhost:3001/api/department');
  const departmentChoices = departments.data.map((dept) => ({ name: dept.name, value: dept.id }));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departmentChoices,
    },
  ]);

  try {
    const response = await axios.post('http://localhost:3001/api/role', answers);
    console.log(response.data.message);
    console.log('Role Information:', response.data.role);
  } catch (error) {
    console.error('Error adding role:', error.response ? error.response.data.error : error.message);
  }
}

// Function to add a new employee to the database
async function addEmployee() {
  const roles = await axios.get('http://localhost:3001/api/role');
  const roleChoices = roles.data.map((role) => ({ name: role.title, value: role.id }));

  const managers = await axios.get('http://localhost:3001/api/employee');
  const managerChoices = managers.data.map((manager) => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the employee first name:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the employee last name:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role for the employee:',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager for the employee:',
      choices: [...managerChoices, { name: 'No manager', value: null }],
    },
  ]);

  try {
    const response = await axios.post('http://localhost:3001/api/employee', answers);
    console.log(response.data.message);
    console.log('Employee Information:', response.data.employee);
  } catch (error) {
    console.error('Error adding employee:', error.response ? error.response.data.error : error.message);
  }
}

// Function to start the CLI and ask for user input
async function startAddCLI() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: ['Create Department', 'Create Role', 'Create Employee'],
    },
  ]);

  switch (answers.action) {
    case 'Create Department':
      await addDepartment();
      break;
    case 'Create Role':
      await addRole();
      break;
    case 'Create Employee':
      await addEmployee();
      break;
    default:
      console.log('Invalid action.');
  }
}

// Call the startCLI function to begin the CLI interaction


module.exports = {
  addDepartment,
  addRole,
  addEmployee,
};
