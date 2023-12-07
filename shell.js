const core = require('@actions/core');
const exec = require("@actions/exec");

async function shell(command, ignore_errors = false) {
    try {
        const args = [
            "-c",
            command,
        ];
        return await exec.exec("/bin/sh", args);
    } catch (error) {
        if (!ignore_errors) {
            core.setFailed(error.message);
        }
    }
}

async function powershell(command, ignore_errors = false) {
    try {
        const args = [
            "-ExecutionPolicy",
            "Bypass",
            "-Command",
            command,
        ];
        await exec.exec("powershell.exe", args);
    } catch (error) {
        if (!ignore_errors) {
            core.setFailed(error.message);
        }
    }
}

async function cmd(command, ignore_errors = false) {
    try {
        const args = [
            "/c",
            command,
        ];
        await exec.exec("cmd.exe", args);
    } catch (error) {
        if (!ignore_errors) {
            core.setFailed(error.message);
        }
    }
}

exports.shell = shell;
exports.powershell = powershell;
exports.cmd = cmd;
