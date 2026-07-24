import os from "os";

/**
 * Get the local network IPv4 address
 */
function getLocalNetworkIP(): string | null {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        const iface = interfaces[name];
        if (!iface) continue;

        for (const alias of iface) {
            if (alias.family === "IPv4" && !alias.internal) {
                return alias.address; // Found local IP
            }
        }
    }
    return null; // No IP found
}

// Example usage
const localIP = getLocalNetworkIP();
console.log("Local Network IP:", localIP ?? "Not found");

export const environment = {
    apiUrl: localIP
};

