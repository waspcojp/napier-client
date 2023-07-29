const program = require('commander');   //  https://github.com/tj/commander.js
const fs = require('fs');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const   main = () => {
    program.option('--file <password filename>', 'password file');
    program.option('--user <user>',              'user name');
    program.option("--password <password>",      "password");
    program.option("--create",                   "file new create");

    program.parse();

    let opts = program.opts();
    opts['file'] ||= 'password.json'
    //console.log({opts});
    if  ( opts.create ) {
        try {
            console.log('new password file create')
            fs.writeFileSync(opts.file, "{}");
        } catch (e) {
            console.log(e);
        }
    }
    try {
        let users = JSON.parse(fs.readFileSync(opts.file, 'utf-8'));
        let hash_password = bcrypt.hashSync(opts.password, SALT_ROUNDS);
        users[opts.user] = {
            hash_password: hash_password
        };
        fs.writeFileSync(opts.file, JSON.stringify(users, ' ', 2));
    } catch (e) {
        console.log(e);
    }
}

main();
