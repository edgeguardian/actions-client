const core = require('@actions/core');
const { shell, cmd } = require('./shell.js');
import * as os from 'os';

let ignore_errors = true;

if (core.getState("EG_FAILED") == "true") {
    if (core.getInput('submit_diagnostics_on_failure') == "true") {
        try {
            shell('egctl advanced log-upload', ignore_errors);
        } catch (error) { }
    }
    try {
        shell('cat /var/log/edgeguardian/datapath.log', ignore_errors)
    } catch (error) { }
}

try {
    if (os.platform() == 'linux') {
        shell('curl localhost:3128/connections', ignore_errors);
        shell('egctl logout', ignore_errors);
    } else if (os.platform() == 'win32') {
        cmd(`curl localhost:3128/config & curl localhost:3128/connections`, ignore_errors);
    } else if (os.platform() == "darwin") {
        shell(`
            if [ -d /Applications/EdgeGuardian.app ]; then
                echo "UI client already installed, skipping cleanup";
            else
                curl localhost:3128/connections
                sudo egctl logout
                sudo brew services stop eg-client
                sudo rm -rf $(brew --prefix)/Cellar/eg-client/0.0.1
                brew cleanup
            fi
        `, ignore_errors)
    } else {
        let platform = os.platform();
        core.setFailed(`${platform} not supported`);
    }
} catch (error) {
    // Ignore error.
}
