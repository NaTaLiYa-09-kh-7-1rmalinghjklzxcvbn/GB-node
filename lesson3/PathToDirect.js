const fs = require('fs/promises')
const { lstatSync } = require('fs')
const inquirer = require('inquirer')
const path = require('path')
const yargs = require('yargs')

let currentDir = process.cwd()
const options = yargs
    .positional('d', {
        describe: 'Path to directory',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Pattern',
        default: '',
    })
console.log(options);

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }
    get isDir() {
        return lstatSync(this.path).isDirectory()
    }
}

const run = async () => {
    const list = await fs.readdir(currentDir)
    const items = list.map(fileName =>
        listItem(path.join(currentDir, fileName), fileName));

    const item = await inquirer
        .prompt([{
            name: 'fileName',
            type: 'list',
            massage: `Choose: ${currentDir}`,
            choices: items.map(item => ({ name: item.fileName, value: item }))
        }])
        .then(answer => answer.fileName);

    if (item.isDir) {
        currentDir = item.path;
        return await run();
    } else {
        const data = await fs.readFile(item.path, 'utf-8');
        if (options.p == null) console.log(data);
        else {
            const regExp = new RegExp(options.p, 'igm');
            console.log(data.match(regExp));
        }
    }
}

run();

