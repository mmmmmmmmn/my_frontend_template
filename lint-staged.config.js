module.exports = {
    '*.{md,json,scss,css,js,ts,tsx}': ['prettier -w'],
    '*.{js,ts,tsx}': ['eslint --max-warnings=0 --fix'],
}
