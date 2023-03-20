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

exports.shell = shell;
