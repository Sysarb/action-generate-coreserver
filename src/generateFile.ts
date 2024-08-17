import { fetchData, Instance } from "./fetchList";
import fs from "fs/promises";
import path from "path";

/**
 * Generate a file for each instance.
 * @param topdomain The topdomain to store the files in.
 * @param version The version of the docker image.
 * @param apiKey The API key to use for fetching the data.
 */
export async function generate(topdomain: string, version: string, apiKey: string): Promise<void> {
    const instances = await fetchData(topdomain, apiKey);

    const applicationTemplate = await fs.readFile(path.join(__dirname, "../templates/application.yaml.template"), "utf-8");
    const deploymentTemplate = await fs.readFile(path.join(__dirname, "../templates/customer.yaml.template"), "utf-8");

    for (const instance of instances) {
        await generateFile('application', applicationTemplate, topdomain, instance, version);
        await generateFile('deployment', deploymentTemplate, topdomain, instance, version, instance.subdomain);
    }
}

/**
 * Generate a file from an instances.
 * @param target The target directory to store the file in.
 * @param topdomain Subdirectory to store the file in.
 * @param instance The instance to generate the file from.
 * @param version The version of the docker image.
 */
async function generateFile(target: string, template: string, topdomain: string, instance: Instance, version: string, subdir = ''): Promise<void> {
    const name = instance.subdomain.replace(/\./g, "-");
    const directory = path.join(topdomain, target, subdir);

    await createFolder(directory);

    const fileContent = template
        .replace(/{{ version }}/g, version)
        .replace(/{{ top_domain }}/g, topdomain)
        .replace(/{{ name }}/g, name)
        .replace(/{{ customer.subdomain }}/g, instance.subdomain)
        .replace(/{{ customer.name }}/g, instance.name);

    const filePath = path.join(directory, `${instance.subdomain}.yaml`);

    await fs.writeFile(filePath, fileContent);
}

/**
 * Check if a directory exists.
 * @param directoryPath The path to the directory to check.
 * @returns A promise that resolves to true if the directory exists, false otherwise.
 */
async function directoryExists(directoryPath: string): Promise<boolean> {
    try {
        const stats = await fs.stat(directoryPath);
        return stats.isDirectory();
    } catch (err) {
        return false;
    }
}

/**
 * Async create a folder for the topdomain.
 * @param topdomain The topdomain to create a folder for.
 * @returns A promise that resolves when the folder is created.
 */
async function createFolder(topdomain: string): Promise<void> {
    // Create a folder named after the topdomain.
    const exists = await directoryExists(topdomain);

    if (!exists) {
        await fs.mkdir(topdomain, { recursive: true });
    }
}
