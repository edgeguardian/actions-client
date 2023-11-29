const core = require('@actions/core');
const { shell, cmd } = require('./shell.js');
import * as os from 'os';

if (core.getState("EG_FAILED") == "true") {
    if (core.getInput('submit_diagnostics_on_failure') == "true") {
        try {
            shell('egctl advanced log-upload');
        } catch (error) { }
    }
    try {
        shell('cat /var/log/edgeguardian/datapath.log || true;')
    } catch (error) { }
}

try {
    if (os.platform() == 'linux') {
        shell('curl localhost:3128/connections');
        shell('egctl logout');
    } else if (os.platform() == 'win32') {
        cmd(`curl localhost:3128/config & curl localhost:3128/connections`);
    } else if (os.platform() == "darwin") {
        shell(`
            if [ -d /Applications/EdgeGuardian.app ]; then
                echo "UI client already installed, skipping cleanup";
            else
                curl localhost:3128/connections
                sudo egctl logout
                sudo brew services stop eg-client
                sudo rm -rf $(brew --prefix)/Cellar/eg-client/0.0.1
            fi
        `)
    } else {
        let platform = os.platform();
        core.setFailed(`${platform} not supported`);
    }
} catch (error) {
    core.setFailed(error.message);
}
