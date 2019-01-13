const cjk = require("cjk-regex");

const cjk_charset = cjk();
const cjk_letters = cjk.letters().toString()

function generateWords(contentBase, target) {
    let words = []
    if (contentBase == null) return []
    let result = target.match(new RegExp("(" + cjk_letters + ")+", 'g'))
    if (result != null) {
        result.map(str => {
            words.push(...countStringCJK(contentBase, str))
        })
    }

    return words
}

function countStringCJK(contentBase, str) {

    let results = []
    str = str.replace(/\s|\n|\r/g, '')

    let lastcount = 0
    let lastword = ''


    let stack = []

    for (var i = 0; i < str.length - 1; i++) {
        let count = 0
        let target = str.substr(i, 2)
        contentBase.replace(new RegExp(target, 'g'), function () {
            count++
        })


        if (count > 1)
            if (stack.length == 0 || count > stack[stack.length - 1][1]) {
                stack.push([str.substr(i, 1), count])
            }

        while (stack.length > 0 && count < stack[stack.length - 1][1]) {
            // console.log(lastword, count)

            results.push(stack.pop())
        }

        stack.map(item => {
            item[0] += str.substr(i + 1, 1)
        })
    }
    // console.log(lastword)

    results.push([lastword, lastcount])

    return results
        .filter(x => x[1] > 1 && x[0].trim().length > 1)
        .map(x => x[0])
}




export default {
    generateWords
} 
