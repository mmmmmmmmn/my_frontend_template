module.exports = {
    '*.{js,ts,tsx,md,json,css}': ['prettier --write', 'git add'],
    '*.{js,ts,tsx}': ['eslint --fix', 'git add'],
};
