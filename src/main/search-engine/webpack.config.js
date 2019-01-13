module.exports = {
    entry: './search.worker.js',
    output: './search.packed.worker.js',
    node: {
        fs: 'empty'
    }
}