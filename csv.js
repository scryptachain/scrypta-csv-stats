const argv = require('minimist')(process.argv.slice(2))
const ScryptaCore = require('@scrypta/core')
const createCSVFile = require('csv-file-creator')
const scrypta = new ScryptaCore
scrypta.staticnodes = true

if (argv.a) {
    console.log('Retrieving transactions...')
    const transactions = scrypta.get('/transactions/' + argv.a).then(res => {
        console.log('Found ' + res.data.length + ' transactions.')
        let data = [["Transaction", "Block", "Date/Time", "Type", "Amount", "Total"]]
        let progress = 0
        res.data.reverse()
        for (let k in res.data) {
            let tx = res.data[k]
            progress += tx.value
            data.push([
                tx.txid,
                tx.blockheight,
                new Date(tx.time),
                tx.value,
                progress
            ])
        }
        createCSVFile(argv.a + ".csv", data);
    })
}