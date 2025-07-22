import AstroBox, { PickFileReturn } from "astrobox-plugin-sdk";
import FetchClient from "./fetch";
import InterHandshake from "./handshake";

let interconn: InterHandshake

let file: PickFileReturn;
AstroBox.lifecycle.onLoad(() => {
    console.log("Plugin on LOAD!")
    interconn = new InterHandshake("com.fetch")
    new FetchClient(interconn)
})