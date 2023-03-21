const core = require('@actions/core');
const { shell } = require('./shell.js');

async function install() {
    await shell(`
    curl --proto '=https' --tlsv1.2 -sSf https://edgeguard-app.s3.us-west-1.amazonaws.com/linux/install.sh | sudo bash
    `)
}

async function login(token) {
    await shell(`egctl advanced token-login ${token}`)
}

async function status() {
    await shell(`egctl status`)
}

async function main() {
    const token = core.getInput('api_key');
    await install();
    await login(token);
    await status();
}

try {
    main();
} catch (error) {
    core.setFailed(error.message);
}
