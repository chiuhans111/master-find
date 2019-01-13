console.log('worker loaded')

import loader from './xml-loader'
let XMLObject = loader.XMLObject


onmessage = function (e) {
    if (e.data.Setup) Setup(e.data.Setup)
    if (e.data.Search) Search(e.data.Search)
    if (e.data.GetKeyword) GetKeyword(e.data.GetKeyword)
}


/**@type {Array<XMLObject>} */
let XmlObjects = []


function Setup(files) {
    XmlObjects = files.map(GetXmlObject)
}

function GetXmlObject(path) {
    let obj = new XMLObject(path)
    postMessage({ XML_Loaded: path })
    return obj
}

function Search(target) {
    let count = 0

    let results = XmlObjects.map(obj => {
        let result = {
            basename: obj.basename,
            title: obj.title,
            path: obj.path,
            result: obj.Search(target)
        }
        count++

        let finder = {}
        for (var r of result.result) {
            for (var g of r.guess) {
                if (finder[g] == null) finder[g] = 0
                finder[g]++
            }
        }

        result.common = Object.keys(finder)
            .map(key => ({ word: key, count: finder[key] }))
            .filter(x => x.count > 1)
            .sort((a, b) => {
                (b.count - a.count) + (b.word.length - a.word.length)
            })
            .slice(0, 10)
            .map(x => x.word)

        postMessage({
            Search_Status: result.result.length
        })
        return result
    })


    postMessage({
        Search: results
    })
}


function GetKeyword() {
    postMessage({
        Keyword: XmlObjects.map(obj => {
            let result = obj.GenerateWords()
            postMessage({
                Keyword_Status: result.length
            })
            return {
                name: obj.basename,
                title: obj.title,
                result
            }
        })
    })
}