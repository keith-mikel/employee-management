const inquirer = require('inquirer');
const axios = require('axios');

// Function to fetch the list of departments from the server
async function fetchDepartments() {
  try {
    const response = await axios.get('http://localhost:3001/api/department');
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

// Function to fetch the list of roles from the server
async function fetchRoles() {
  try {
    const response = await axios.get('http://localhost:3001/api/role');
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

// Function to fetch the list of employees from the server
async function fetchEmployees() {
  try {
    const response = await axios.get('http://localhost:3001/api/employee');
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

// Function to delete a department
async function deleteDepartment() {
  const departments = await fetchDepartments();

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Select the department to delete:',
      choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
    },
  ]);

  try {
    const response = await axios.delete(`http://localhost:3001/api/department/${answers.id}`);
    console.log(response.data); // The response from the server after successful deletion
  } catch (error) {
    console.error('Error deleting department:', error);
  }
}


// Function to delete a role
async function deleteRole() {
    const roles = await fetchRoles();
  
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select the role to delete:',
        choices: roles.map((role) => ({ name: role.title, value: role.id })),
      },
    ]);
  
    try {
      const response = await axios.delete(`http://localhost:3001/api/role/${answers.id}`);
      console.log(response.data.message); // The response message from the server
      console.log(response.data.data); // The deleted role's data
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  }


// Function to delete an employee
async function deleteEmployee() {
    const employees = await fetchEmployees();
  
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select the employee to delete:',
        choices: employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
      },
    ]);
  
    try {
      const response = await axios.delete(`http://localhost:3001/api/employee/${answers.id}`);
      console.log(response.data.message); // The response message from the server
      console.log(response.data.data); // The deleted employee's data
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }

// Function to start the CLI and ask for user input
async function startDeleteCLI() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: ['Delete Department', 'Delete Role', 'Delete Employee'],
    },
  ]);

  switch (answers.action) {
    case 'Delete Department':
      await deleteDepartment();
      break;
    case 'Delete Role':
      await deleteRole();
      break;
    case 'Delete Employee':
      await deleteEmployee();
      break;
    default:
      console.log('Invalid action.');
  }
}

// Call the startCLI function to begin the CLI interaction


module.exports = {
  deleteDepartment,
  deleteRole,
  deleteEmployee,
};