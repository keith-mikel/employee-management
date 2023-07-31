# Employee Tracker


  ## Table of Contents
  -[Description](#desciption)

  -[Installation](#installation)

  -[Usage](#usage)

  -[Contribution](#contribution)

  -[Test Instructions](#test)

  -[License](#license)

  -[Link to Github](#githubLink)

  -[Contact Info](#contact)

  

<a name="description"></a>
## Description
 This Project provides the ability to manage the employees of an organization, as well as their roles and departments.

<a name="installation"></a>
## Installation
 
  Use SSH github link in order to install this project ssh to install Note Pad App

   ```bash
   git@github.com:keith-mikel/employee-management.git
   ```

<a name="usage"></a>
## Usage
To use this App first clone the repository from the github link provided above. NPM install to download all required node modules, then create a .env file with access to your mysql database locally. you will require the db name, your mysql user, as well as mysql password for the app to function correctly.

once proper access is set for your msql database the schema.sql file can be run to seed the database with test data if desired.

After your database is set and created, the server.js file needs to be run while the app is being used in order for the API to function correctly, this can be run with node.

Finally the index.js file can be run from within the /public/js/index.js file

this will start the program.

Once the CLI is activated you will be prompted to choose the action you would like to execute
-create
-update
-delete
-view

After selecting one of these you will choose between the 3 table items
-employees
-roles
-departments

from there you will be guided on how to proceed from the CLI be it confirming deletion, prompting for information on the update or creation, or presenting a table to view.

## Video Demo
https://drive.google.com/file/d/1651wDnGxBadg8PRZnJbhSSy54CxF3TQl/view


<a name="contribution"></a>
## Contribution
  Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<a name="test"></a>
## Test Instructions 
There is no current tests on this project

<a name="license"></a>
## License 
![Creative Commons License](https://img.shields.io/badge/license-Creative%20Commons-blue.svg)

<a name="githubLink"></a>
## Github Link 

 https://github.com/keith-mikel/employee-management


<a name="contact"></a>
## Contact Information 

  For additonal information please check out my github keith-mikel

  or reach me by email at mikel061@umn.edu