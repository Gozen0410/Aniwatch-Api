const axios = require('axios');

const BASE_URLS = [
    'https://aniwatch.co.at',
    'https://aniwatchtv.ro',
];

async function aniwatchGet(target, options = {}) {
    let path = target;

    if (/^https?:\/\//i.test(target)) {
        const parsed = new URL(target);
        path = parsed.pathname + parsed.search;
    }

    let lastError;

    for (const base of BASE_URLS) {
        try {
            return await axios.get(base + path, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Referer: base + '/',
                },
            });
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError || new Error('All AniWatch domains failed');
}

module.exports = { aniwatchGet };
