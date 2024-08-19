export type Instance = {
    id: string;
    subdomain: string;
    name: string;
    version: string;
};

export async function fetchData(subdomain: string, apiKey: string): Promise<Instance[]> {
    const url = `https://sysarb.${subdomain}/api/instance-service/v1/system/instances`;
    const response = await fetch(url, {
        headers: {
            "X-Api-Key": apiKey
        }
    });

    if (!response.ok) {
        console.error('error status', response.statusText);
        throw new Error(`Failed to fetch data from ${subdomain}`);
    }

    return await response.json();
}
