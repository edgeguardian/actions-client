# EdgeGuardian GitHub Action

This GitHub action connects your runner to your private network.

## Supported OSes/runners
1. ubuntu-latest
2. Amazon Linux 2
3. Windows Server 2019 and 2022

## Inputs

### `api_key`

**Required** The user's long-lived API key to login.

1. As an admin user, create a service user account, say
   `github-bot@youraccount.tld` on your account.  You can also use an existing
   account's token.

2. Create an API key from [EdgeGuardian > Settings > API Keys](https://app.edge-guardian.io/ui/api_keys) page.

3. Store it inside your GitHub org's
   [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

4. Try it out!

## Example usage

```yaml
uses: edgeguardian/actions-client@latest
with:
  api_key: ${{ secrets.EDGEGUARDIAN_API_KEY }}
```

## For development

If you want to customize this action, or clone it into your own GitHub action,
please run `npm install && npm run all` and check in the `dist/*` files.

If you encounter an SSL error with node (`  code: 'ERR_OSSL_EVP_UNSUPPORTED'),
please run with:

```
export NODE_OPTIONS=--openssl-legacy-provider
```

## Diagnostics
If you encounter any error with the client, please run it with the following
arguments (only supported on linux):

```yaml
uses: edgeguardian/actions-client@latest
with:
  api_key: ${{ secrets.EDGEGUARDIAN_API_KEY }}
  submit_diagnostics_on_failure: "true"
```

This will submit diagnostics to us on any failure with the actions runner, for
instance, when it is unable to login. We recommend using it sparingly.
