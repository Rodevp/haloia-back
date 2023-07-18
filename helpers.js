import fs from "fs"

export const readJSON = (path = '') => {
    const jsonText = fs.readFileSync(path, { encoding: 'utf-8' }).toString()
    const json = JSON.parse(jsonText)

    return json
}

export const writeJSON = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8')
}