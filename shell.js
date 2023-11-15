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

async function is_ui_client_running_macos() {
    return await shell(`
        if ! pgrep EdgeGuardian &> /dev/null 2>&1; then
            echo "EdgeGuardian not running"
            exit 0
        else
            echo "EdgeGuardian is running"
            exit 1
        fi
    `)
}

exports.shell = shell;
exports.powershell = powershell;
exports.cmd = cmd;
exports.is_ui_client_running_macos = is_ui_client_running_macos;
