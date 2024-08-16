import * as core from '@actions/core'
import { generate } from './generateFile';

export async function run() {
    try {
        let topdomain = core.getInput('topdomain');
        let version = core.getInput('subdomain');

        if (process.env.CI === undefined && (topdomain === '' || version === '')) {
            topdomain = 'dev';
            version = 'latest';
        }

        if (topdomain === '' || version === '') {
            throw new Error("Missing required input");
        }

        await generate(topdomain, version);
    } catch (error) {
        console.error(error);
        core.setFailed("Failure")
    }
}
