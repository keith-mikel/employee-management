const inquirer = require('inquirer');
const axios = require('axios');

async function updateDepartment() {
  try {
    const departments = await axios.get('http://localhost:3001/api/department');
    const departmentChoices = departments.data.map((dept) => ({ name: dept.name, value: dept.id }));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department you want to update:',
        choices: departmentChoices,
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the new department name:',
      },
    ]);

    const response = await axios.put(`http://localhost:3001/api/department/${answers.department_id}`, { name: answers.name });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error updating department:', error.response ? error.response.data.error : error.message);
  }
}

async function updateRole() {
  try {
    const roles = await axios.get('http://localhost:3001/api/role');
    const roleChoices = roles.data.map((role) => ({ name: role.title, value: role.id }));

    const departments = await axios.get('http://localhost:3001/api/department');
    const departmentChoices = departments.data.map((dept) => ({ name: dept.name, value: dept.id }));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role you want to update:',
        choices: roleChoices,
      },
      {
        type: 'input',
        name: 'title',
        message: 'Enter the new role title:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the new role salary:',
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the new department for the role:',
        choices: departmentChoices,
      },
    ]);

    const response = await axios.put(`http://localhost:3001/api/role/${answers.role_id}`, {
      title: answers.title,
      salary: answers.salary,
      department_id: answers.department_id,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error updating role:', error.response ? error.response.data.error : error.message);
  }
}

async function updateEmployee() {
  try {
    const employees = await axios.get('http://localhost:3001/api/employee');
    const employeeChoices = employees.data.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    const roles = await axios.get('http://localhost:3001/api/role');
    const roleChoices = roles.data.map((role) => ({ name: role.title, value: role.id }));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee you want to update:',
        choices: employeeChoices,
      },
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the new employee first name:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the new employee last name:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the new role for the employee:',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the new manager for the employee:',
        choices: [...employeeChoices, { name: 'No manager', value: null }],
      },
    ]);

    const response = await axios.put(`http://localhost:3001/api/employee/${answers.employee_id}`, {
      first_name: answers.first_name,
      last_name: answers.last_name,
      role_id: answers.role_id,
      manager_id: answers.manager_id,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error updating employee:', error.response ? error.response.data.error : error.message);
  }
}

async function updateData() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'recordType',
      message: 'Select the type of record to update:',
      choices: ['Department', 'Role', 'Employee', 'Exit'],
    },
  ]);

  switch (answers.recordType) {
    case 'Department':
      await updateDepartment();
      break;
    case 'Role':
      await updateRole();
      break;
    case 'Employee':
      await updateEmployee();
      break;
    case 'Exit':
      return;
    default:
      console.log('Invalid record type.');
  }

  // Repeat until the user chooses to Exit
  await updateData();
}

// Call the updateData function to begin the update process


module.exports = {
    updateDepartment,
    updateRole,
    updateEmployee,
    updateData,
  };