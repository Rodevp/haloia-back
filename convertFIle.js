import csv from "csvtojson"
import { readJSON, writeJSON } from "./helpers" 

const convertFile = () => {
    csv()
    .fromFile('./data.csv')
    .then((data) => {
        const preaches = readJSON('./preaches.json')
        preaches?.push(...data)
        writeJSON('./preaches.json', preaches)
    })

    return readJSON('./preaches.json')

}

convertFile()