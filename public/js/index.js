const inquirer = require('inquirer');
const { addDepartment, addRole, addEmployee } = require('./create');
const { deleteDepartment, deleteRole, deleteEmployee } = require('./delete');
const { updateDepartment, updateRole, updateEmployee } = require('./update');
const { viewDepartments, viewRoles, viewEmployees } = require('./view');

const rl = inquirer.createPromptModule();

//access all the other files by the one prompt for action
async function startApp() {
  let exit = false;

  while (!exit) {
    const actionChoice = await rl([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: ['Create', 'Delete', 'Update', 'View', 'Exit'],
      },
    ]);

    switch (actionChoice.action) {
      case 'Create':
        await createData();
        break;
      case 'Delete':
        await deleteData();
        break;
      case 'Update':
        await updateData();
        break;
      case 'View':
        await viewData();
        break;
      case 'Exit':
        console.log('Exiting the application.');
        exit = true;
        break;
      default:
        console.log('Invalid action.');
    }
  }
}

async function createData() {
  const createChoice = await rl([
    {
      type: 'list',
      name: 'recordType',
      message: 'Select the type of record to create:',
      choices: ['Department', 'Role', 'Employee', 'Back'],
    },
  ]);

  switch (createChoice.recordType) {
    case 'Department':
      await addDepartment();
      break;
    case 'Role':
      await addRole();
      break;
    case 'Employee':
      await addEmployee();
      break;
    case 'Back':
      break;
    default:
      console.log('Invalid record type.');
  }
}

async function deleteData() {
  const deleteChoice = await rl([
    {
      type: 'list',
      name: 'recordType',
      message: 'Select the type of record to delete:',
      choices: ['Department', 'Role', 'Employee', 'Back'],
    },
  ]);

  switch (deleteChoice.recordType) {
    case 'Department':
      await deleteDepartment();
      break;
    case 'Role':
      await deleteRole();
      break;
    case 'Employee':
      await deleteEmployee();
      break;
    case 'Back':
      break;
    default:
      console.log('Invalid record type.');
  }
}

async function updateData() {
  const updateChoice = await rl([
    {
      type: 'list',
      name: 'recordType',
      message: 'Select the type of record to update:',
      choices: ['Department', 'Role', 'Employee', 'Back'],
    },
  ]);

  switch (updateChoice.recordType) {
    case 'Department':
      await updateDepartment();
      break;
    case 'Role':
      await updateRole();
      break;
    case 'Employee':
      await updateEmployee();
      break;
    case 'Back':
      break;
    default:
      console.log('Invalid record type.');
  }
}

async function viewData() {
  const viewChoice = await rl([
    {
      type: 'list',
      name: 'recordType',
      message: 'Select the type of record to view:',
      choices: ['Departments', 'Roles', 'Employees', 'Back'],
    },
  ]);

  switch (viewChoice.recordType) {
    case 'Departments':
      await viewDepartments();
      break;
    case 'Roles':
      await viewRoles();
      break;
    case 'Employees':
      await viewEmployees();
      break;
    case 'Back':
      break;
    default:
      console.log('Invalid record type.');
  }
}

// Start the application
startApp();

