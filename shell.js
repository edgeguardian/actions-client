const exec = require("@actions/exec");

async function shell(command) {
    try {
        const args = [
            "-c",
            command,
        ];
        await exec.exec("/bin/sh", args);
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

exports.shell = shell;
exports.powershell = powershell;
exports.cmd = cmd;
