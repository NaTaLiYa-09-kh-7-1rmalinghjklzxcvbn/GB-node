import colors from 'colors'

let number = 20;
const arr = [];
if (!Number.isFinite(number)) {
    console.log(colors.red('error'))
} else {
    nextPrime:
    for (let i = 2; i <= number; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime
        }
        arr.push(i)
    }
}
if (!arr.length) {
    console.log(colors.red('Don`t simple numbers'));
}
arr.map((item, index) => {
    let result = (index + 1) % 3
    switch (result) {
        case 1: console.log(colors.red(item))
            break
        case 2: console.log(colors.yellow(item))
            break
        case 0: console.log(colors.green(item))
            break
    }
})






