const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const jest = require('jest');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require('./lib/htmlRenderer');

let employees = [];
let person;

const wholeTeam = [
	{
		type: 'input',
		message: 'What is the team members name?',
		name: 'name'
	},

	{
		type: 'input',
		message: 'What is the team members id?',
		name: 'id'
	},

	{
		type: 'input',
		message: 'What is the team members email?',
		name: 'email'
	}
];

const manager = [
	{
		type: 'input',
		message: 'What is your office number?',
		name: 'officeNum'
	}
];

const engineerQ = [
	{
		type: 'input',
		message: 'What is the team members github name?',
		name: 'githubName'
	}
];

const intern = [
	{
		type: 'input',
		message: "What is the intern's school name?",
		name: 'school'
	}
];

const role = [
	{
		type: 'list',
		message: 'What type of team member would you like to add?',
		name: 'teamMember',
		choices: [ 'Engineer', 'Intern', 'I dont want to add another employee!' ]
	}
];

// variables that will be changed

async function init() {
	console.log('Manager details:');
	const allMemberAs = await inquirer.prompt(wholeTeam);
	const managerAs = await inquirer.prompt(manager);
	person = new Manager(allMemberAs.name, allMemberAs.id, allMemberAs.email, managerAs.officeNum);
	employees.push(person);
	console.log(employees);
	otherMembers();
}

//  fucntion that will will prompt either the Engineer questions or the Intern questions

async function otherMembers() {
	const chooseMem = await inquirer.prompt(role);
	if (chooseMem.teamMember === 'Engineer') {
		const allEngineerA = await inquirer.prompt(engineerQ);
		const generalEngQs = await inquirer.prompt(wholeTeam);
		person = new Engineer(generalEngQs.name, generalEngQs.id, generalEngQs.email, allEngineerA.githubName);
		employees.push(person);
		otherMembers();
	} else if (chooseMem.teamMember === 'Intern') {
		const allInternA = await inquirer.prompt(intern);
		const generalInQs = await inquirer.prompt(wholeTeam);
		person = new Intern(generalInQs.name, generalInQs.id, generalInQs.email, allInternA.school);
		employees.push(person);
		otherMembers();
	} else if (chooseMem.teamMember === 'I dont want to add another employee') {
		const html = render(employees) 
		fs.writeFile(outputPath, html, function(err) {
			if (err) {
				return console.log(err);
			}
			console.log('File Saved !');
		});

		// return;
	}
}
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
