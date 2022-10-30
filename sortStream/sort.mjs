import fs, { createWriteStream } from "fs"
import { Transform } from "stream"

const readStream = fs.createReadStream('./ipLog.log', 'utf8')
const writeStream1 = fs.createWriteStream('./ ip89_requests.log', {
    encoding: 'utf8',
    flags: 'a'
})
const writeStream2 = fs.createWriteStream('./ ip176_requests.log', {
    encoding: 'utf8',
    flags: 'a'
})
const sortIp89 = new Transform({
    transform(chunk, encoding, callback) {
        const parts = chunk.toString().split("\n")
        parts.map(i => {
            if (i.includes('89.123.1.41')) {
                this.push(i)
            }
        })
        callback()
    }
})
const sortIp176 = new Transform({
    transform(chunk, encoding, callback) {
        const parts = chunk.toString().split('\n')
        parts.map(i => {
            if (i.includes('176.212.24.22')) {
                this.push(i)
            }
        })
        callback()
    }
})
readStream.pipe(sortIp89).pipe(writeStream1)
readStream.pipe(sortIp176).pipe(writeStream2)