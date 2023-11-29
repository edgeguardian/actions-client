const core = require('@actions/core');
const exec = require("@actions/exec");

async function shell(command) {
    try {
        const args = [
            "-c",
            command,
        ];
        return await exec.exec("/bin/sh", args);
    } catch (error) {
        core.setFailed(error.message);
    }
}

async function powershell(command) {
    try {
        const args = [
            "-ExecutionPolicy",
            "Bypass",
            "-Command",
            command,
        ];
        await exec.exec("powershell.exe", args);
    } catch (error) {
        core.setFailed(error.message);
    }
}

async function cmd(command) {
    try {
        const args = [
            "/c",
            command,
        ];
        await exec.exec("cmd.exe", args);
    } catch (error) {
        core.setFailed(error.message);
    }
}

async function is_ui_client_installed_macos() {
    return await shell(`
        test -d /Applications/EdgeGuardian.app
    `)
}

exports.shell = shell;
exports.powershell = powershell;
exports.cmd = cmd;
exports.is_ui_client_installed_macos = is_ui_client_installed_macos;
