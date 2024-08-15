import * as core from '@actions/core'
import { generate } from './generateFile';

export async function run() {
    try {
        const topdomain = core.getInput('topdomain');
        const version = core.getInput('subdomain');

        if (topdomain === '' || version === '') {
            throw new Error("Missing required input");
        }

        await generate(topdomain, version);
    } catch (error) {
        console.error(error);
        core.setFailed("Failure")
    }
}
