import fs from 'fs'
import settings from '../settings'
import Path from 'path'
import Worker from './search.worker.js'


console.log(Worker)



settings.settings.watch('xmlPath', Setup)

let workers = []


var xml_search_result_fast = []

var exports = {
    xml_records: {},
    xml_search_result: [],
    xml_search_status: 0,
    xml_keyword_result: []
}



function OnMessage(id, e) {
    if (e.data.XML_Loaded) {
        exports.xml_records[e.data.XML_Loaded].loaded = true
        return
    }
    if (e.data.Search_Status) {
        exports.xml_search_status += e.data.Search_Status
    }
    if (e.data.Search) {
        //console.log(e.data.Search)
        // let result = JSON.parse(e.data.Search)
        xml_search_result_fast.push(...e.data.Search)

        if (xml_search_result_fast.length == Object.keys(exports.xml_records).length) {
            exports.xml_search_result = xml_search_result_fast
                .filter(x => x.result.length > 0)
                .sort((a, b) => b.result.length - a.result.length)
        }
    }
    if (e.data.Keyword) {
        exports.xml_keyword_result.push(...e.data.Keyword)
    }
    // console.log(exports.xml_search_result_fast.length)
}



function Setup() {
    let numWorkers = settings.data.numWorkers
    exports.xml_records = {}

    workers.map(w => w.terminate())
    workers = []
    // create workers
    for (let i = 0; i < numWorkers; i++) workers.push(new Worker())


    // give each worker files
    let files = GetFiles()
    files.map(x => exports.xml_records[x] = {
        loaded: false
    })

    let files_per_worker = Math.floor(files.length / numWorkers)
    let remainder = files.length - files_per_worker * numWorkers

    workers.map((worker, index) => {
        let file_count = files_per_worker
        let id = index
        worker.onmessage = (e) => OnMessage(id, e)

        if (index < remainder) file_count += 1
        worker.postMessage({
            Setup: files.splice(0, file_count)
        })
    })
}
Setup()

// E:\Documents\Work\Master60\masterEPUB\reference\xml
function GetFiles() {
    try {

        let path = settings.data.xmlPath
        let files = fs.readdirSync(path)//.slice(665,666)
            .filter(x => x.match(/.xml$/))
            .map(x => Path.join(path, x))
        return files
    } catch (e) {
        return []
    }
}


function Search(target) {
    exports.xml_search_status = 0
    xml_search_result_fast = []

    workers.map((worker) => {
        worker.postMessage({
            Search: target
        })
    })
}


function GetKeyword() {
    exports.xml_keyword_result = []
    workers.map((worker) => {
        worker.postMessage({
            GetKeyword: true
        })
    })
}




export {
    GetFiles, Search, GetKeyword,
    exports
}