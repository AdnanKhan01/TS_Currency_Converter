import inquirer from "inquirer";
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
const menuOptions = [
    'Convert currency',
    'Quit'
];
//Pakistani rates
var paisa;
(function (paisa) {
    paisa[paisa["Dollar"] = 226] = "Dollar";
    paisa[paisa["GBP"] = 273] = "GBP";
    paisa[paisa["EUR"] = 243] = "EUR";
})(paisa || (paisa = {}));
var dol;
(function (dol) {
    dol[dol["PKR"] = 226] = "PKR";
    dol[dol["GBP"] = 0.83] = "GBP";
    dol[dol["EUR"] = 0.94] = "EUR";
})(dol || (dol = {}));
var eu;
(function (eu) {
    eu[eu["PKR"] = 243] = "PKR";
    eu[eu["GBP"] = 0.88] = "GBP";
    eu[eu["USD"] = 1.07] = "USD";
})(eu || (eu = {}));
var gb;
(function (gb) {
    gb[gb["PKR"] = 273] = "PKR";
    gb[gb["USD"] = 1.2] = "USD";
    gb[gb["EUR"] = 1.13] = "EUR";
})(gb || (gb = {}));
const sleep = () => {
    return new Promise((r) => setTimeout(r, 3150));
};
async function welcome() {
    const style = chalkAnimation.radar('Welcome to this Currency Converter Program \n');
    await sleep();
    style.stop();
}
await welcome();
async function askQuestions() {
    var ans = await inquirer.prompt([{
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            choices: menuOptions
        },
        {
            type: 'list',
            name: 'first_curr',
            message: 'Choose your currency from the list ',
            choices: ['PKR', 'USD', 'GBP', 'EUR'],
            when(ans) {
                return ans.option == 'Convert currency';
            }
        },
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount of the currency you chose ',
            when(ans) {
                return ans.first_curr;
                ;
            }
        },
        {
            type: 'list',
            name: 'convert_to',
            message: 'Choose the currency you want to convert to ',
            choices: ['PKR', 'USD', 'GBP', 'EUR'],
            when(ans) {
                return ans.amount;
            }
        }
    ]).then(answers => {
        switch (answers.option) {
            case 'Convert currency':
                {
                    if (answers.first_curr == 'USD' && answers.convert_to == 'PKR') {
                        console.log("USD to PKR is ", answers.amount * dol.PKR);
                    }
                    else if (answers.first_curr == 'USD' && answers.convert_to == 'GBP') {
                        console.log("USD to GBP is ", answers.amount * dol.GBP);
                    }
                    else if (answers.first_curr == 'USD' && answers.convert_to == 'EUR') {
                        console.log("USD to EUR is ", answers.amount * dol.EUR);
                    }
                    else if (answers.first_curr == 'GBP' && answers.convert_to == 'PKR') {
                        console.log("GBP to PKR is ", answers.amount * gb.PKR);
                    }
                    else if (answers.first_curr == 'GBP' && answers.convert_to == 'USD') {
                        console.log("GBP to USD is ", answers.amount * gb.USD);
                    }
                    else if (answers.first_curr == 'GBP' && answers.convert_to == 'EUR') {
                        console.log("GBP to EUR is ", answers.amount * gb.EUR);
                    }
                    else if (answers.first_curr == 'EUR' && answers.convert_to == 'PKR') {
                        console.log("EUR to PKR is ", answers.amount * eu.PKR);
                    }
                    else if (answers.first_curr == 'EUR' && answers.convert_to == 'USD') {
                        console.log("EUR to USD is ", answers.amount * eu.USD);
                    }
                    else if (answers.first_curr == 'EUR' && answers.convert_to == 'GBP') {
                        console.log("EUR to GBP is ", answers.amount * eu.GBP);
                    }
                    else if (answers.first_curr == 'PKR' && answers.convert_to == 'USD') {
                        console.log("PKR to USD is ", answers.amount / paisa.Dollar);
                    }
                    else if (answers.first_curr == 'PKR' && answers.convert_to == 'GBP') {
                        console.log("PKR to GBP is ", answers.amount / paisa.GBP);
                    }
                    else if (answers.first_curr == 'PKR' && answers.convert_to == 'EUR') {
                        console.log("PKR to EUR is ", answers.amount / paisa.EUR);
                    }
                    break;
                }
            case 'Quit':
                {
                    console.log("Bye!!");
                    process.exit(0);
                    break;
                }
        }
    });
}
;
async function startAgain() {
    do {
        await askQuestions();
        var again = await inquirer
            .prompt({
            type: "input",
            name: "doAgain",
            message: chalk.blueBright("Do you want to convert further? Type 'y' for yes and 'n' for No ")
        });
    } while (again.doAgain == "y" || again.doAgain == "Y");
}
startAgain();
