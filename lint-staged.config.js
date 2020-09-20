module.exports = {
    '*.{md,json,scss,css,js,ts,tsx}': ['prettier --write', 'git add'],
    '*.{js,ts,tsx}': ['eslint --fix', 'git add'],
}
