import AstroBox from "astrobox-plugin-sdk";
import InterHandshake from "./handshake";

export default class FetchClient{
    private conn: InterHandshake
    private static name = "fetch"
    constructor(interconn:InterHandshake) {
        this.conn = interconn;
        this.conn.addListener<FetchData>(FetchClient.name, async (data) => {
            const normalizedOptions = {
                raw: false,
                ...data.options,
                headers: normalizeHeaders(data.options.headers),
            }
            const resp = await AstroBox.network.fetch(data.url, normalizedOptions);
            this.conn.send(FetchClient.name,{resp,id:data.id});
        })
    }
}

interface FetchData {
    url: string
    options: {
        method: string,
        headers: HeadersInit,
        body?: string
    }
    id:string
}
function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
    if (!headers) return {};
    if (Array.isArray(headers)) {
        return Object.fromEntries(headers);
    } else if (headers instanceof Headers) {
        const result: Record<string, string> = {};
        headers.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    } else {
        return headers as Record<string, string>;
    }
}
