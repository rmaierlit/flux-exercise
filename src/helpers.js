import config from "./config.js"

const FluxSdk = window.FluxSdk
const FluxHelpers = window.FluxHelpers

const sdk = new FluxSdk(config.flux_client_id, { redirectUri: config.url, fluxUrl: config.flux_url })
const helpers = new FluxHelpers(sdk)

export default helpers