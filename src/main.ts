import * as core from '@actions/core'
import { generate } from './generateFile';

/**
 * To test this you will need to set the folloing environment variables:
 * INPUT_TOPDOMAIN,
 * INPUT_SUBDOMAIN,
 * INPUT_APIKEY
 */

/**
 * Run the action.
 */
export async function run() {
    try {
        // const topdomain = core.getInput('topdomain', { required: true });
        // const version = core.getInput('version', { required: true });
        // const apiKey = core.getInput('apikey', { required: true });
        const topdomain = process.env.INPUT_TOPDOMAIN || '';
        const version = process.env.INPUT_VERSION || '';
        const apiKey = process.env.INPUT_APIKEY || '';

        if (topdomain === '' || version === '' || apiKey === '') {
            throw new Error("Missing required input");
        }

        await generate(topdomain, version, apiKey);
    } catch (error) {
        console.error(error);
        core.setFailed("Failure")
    }
}
