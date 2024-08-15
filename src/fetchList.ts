export type Instance = {
    subdomain: string;
    name: string;
};

export async function fetchData(subdomain: string): Promise<Instance[]> {
    // const response = await fetch(`https://${subdomain}.example.com/api/instances`);

    // if (!response.ok) {
    //     throw new Error(`Failed to fetch data from ${subdomain}`);
    // }

    // return await response.json();

    return new Promise((resolve) => {
        resolve([
            { subdomain: "utbildning1.sysarb.dev", name: "Utbildning 1" },
            { subdomain: "utbildning2.sysarb.dev", name: "Utbildning 2" },
        ]);
    });
}
