module.exports = {
    '*.{md,json,scss,css,js,ts,tsx}': ['prettier --write', 'git add'],
    '*.{js,ts,tsx}': ['eslint --max-warnings=0 --fix', 'git add'],
}
