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
        const topdomain = process.env.INPUT_TOPDOMAIN || '';
        const apiKey = process.env.INPUT_APIKEY || '';

        if (topdomain === '' || apiKey === '') {
            throw new Error("Missing required input");
        }

        await generate(topdomain, apiKey);
    } catch (error) {
        console.error(error);
        core.setFailed("Failure")
    }
}
