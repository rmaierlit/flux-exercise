import config from "./config.js"

var FluxSdk = window.FluxSdk
var FluxHelpers = window.FluxHelpers

var sdk = new FluxSdk(config.flux_client_id, { redirectUri: config.url, fluxUrl: config.flux_url })
var helpers = new FluxHelpers(sdk)

export default helpers