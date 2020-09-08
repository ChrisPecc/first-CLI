#!/usr/bin/env node
const axios = require('axios').default;
const { getCode, getName } = require('country-list');
const chalk = require('chalk');

const myArgs = process.argv.slice(2);
// console.log(myArgs);

const country = myArgs[0];
const countrycode = getCode(country);
if (countrycode == undefined){
    console.log("This is not a proper country name or the country is not supported by the API. \nCheck at https://date.nager.at/Home/Countries to see the list of supported countries.")
}

else {
    // console.log(countrycode);
    const date = new Date();
    const year = date.getFullYear();
    // console.log(year);
    
    const url = String("https://date.nager.at/Api/v2/PublicHolidays/"+year+"/"+countrycode);
    
    // console.log(url);
    
    async function getholiday() {
        try {
            const resp = await axios.get(url);
            
            response = Array.from(resp.data);
            // console.log(response)
            return response;
        }
        catch(error) {
            console.error(error);
        }
    }

    async function displayholidays() {
        const holidays = await getholiday();
        // console.table(holidays);
        console.log(chalk.green.bold.inverse("Holidays in "+ myArgs[0] + " in " + year));
        holidays.forEach(element => {
            console.log(chalk.cyan(element.date) + chalk.red(" -> ") + chalk.yellow(element.name));
        });

    }

    displayholidays();

    
}

