const fs = require("fs");
import Path from 'path'
import keywordSpliter from './keywordSpliter'

console.log('loader loaded')

var DOMParser = require('xmldom').DOMParser

const parser = new DOMParser()

function parse(path) {
    let file = fs.readFileSync(path)
    return parser.parseFromString(file.toString(), "text/xml")
}

class XMLObject {
    constructor(path) {
        this.path = path
        this.document = parse(this.path)
        this.basename = Path.basename(this.path)

        let title = this.document.getElementsByTagName('BookTitle')[0]
        this.title = title.textContent
    }

    /**@param {Node} node*/
    TransNode(node) {
        let p = []
        let n = node
        // go back and trace path until CHAPTER tag show up

        while (n != null && n.parentNode != null) {

            if (n.nodeName == 'Chapter' || n.nodeName == 'Chapter_EN') break
            p.push(Array.from(n.parentNode.childNodes).indexOf(n))
            n = n.parentNode
        }
        if (n == null || n.parentNode == null) return null
        // find translate chapter
        if (n.nodeName == 'Chapter_EN') {
            while (n.nodeName != 'Chapter' && n != null)
                n = n.previousSibling
        }
        else {
            while (n.nodeName != 'Chapter_EN' && n != null)
                n = n.nextSibling
        }
        if (n == null) return null
        console.log(n)
        // go foward with same path but different chapter to find translate
        while (p.length > 0) {
            if (n == null || n.childNodes == null) {
                return null
            }
            n = n.childNodes[p.pop()]
        }


        return n
    }

    GenerateWords() {
        let root = this.document.getElementsByTagName('Root')[0]
        let contentBase = root.textContent
        let words = this.GenerateWordsFromNode(root)

        let table = {}

        words.filter(x => x.length > 0).map(word => {

            if (table[word] != null) return

            let count = 0
            contentBase.replace(new RegExp(word, 'g'), function () {
                count++
            })

            table[word] = count
        })

        words = []
        for (var i in table) {
            words.push([i, table[i]])
        }
        words = words.sort((a, b) => b[1] - a[1]).map(x => x[0])

        return words
    }

    GenerateWordsFromNode(node) {
        let results = []

        if (node.childNodes != undefined && node.childNodes.length != 0) {
            for (let i in node.childNodes) {
                results.push(
                    ...this.GenerateWordsFromNode(node.childNodes[i])
                )
            }
        } else if (node.textContent != null) {
            results.push(
                ...keywordSpliter.generateWords(
                    this.document.getElementsByTagName('Root')[0].textContent,
                    node.textContent)
            )
        }
        return results
    }

    Search(target) {
        return this.Search_node(this.document, target)
    }

    /**@param {Node} node*/
    Search_node(node, target) {
        let results = []
        let me = this
        if (node.textContent != null && !node.textContent.match(target)) return []
        if (node.childNodes != undefined && node.childNodes.length != 0) {
            for (let i in node.childNodes) {
                results.push(
                    ...this.Search_node(node.childNodes[i], target)
                )
            }
        } else if (node.textContent != null) {

            // find node path
            let path = []
            let n2 = node
            while (n2 != null) {
                path.unshift(n2.nodeName)
                n2 = n2.parentNode
            }

            // search for target
            let nodeResult = []
            let guess = []
            node.textContent.replace(target, function (key, place) {


                let content = node.textContent
                let i = 0

                // left part
                i = place - 2
                while (content.charAt(i).match(/\w/) && i > place - 20 && i > 0) i--
                guess.push(node.textContent.substr(i, key.length + place - i))
                // right part
                i = place + key.length + 2
                while (content.charAt(i).match(/\w/) && i < place + key.length + 20 && i < content.length) i++
                guess.push(node.textContent.substr(place, i - place))




                nodeResult.push({
                    place, key
                })
            })
            if (nodeResult.length > 0) {
                let trans = me.TransNode(node)
                let formatContent = []

                let start = 0

                nodeResult.map(x => {
                    formatContent.push({
                        text: node.textContent.substr(start, x.place - start)
                    })
                    formatContent.push({
                        keyword: x.key
                    })
                    start = x.place + x.key.length
                })
                formatContent.push({
                    text: node.textContent.substr(start)
                })

                results.push({
                    path,
                    guess,
                    content: node.textContent,
                    formatContent,
                    trans: trans != null ? trans.textContent : "",
                    count: nodeResult.length,
                    nodeResult
                })
            }

        }
        return results
    }
}

export default {
    XMLObject
} 