import Oras from "../structures/Client.js";

export default class OrasCommand {
    client;
    name;
    exec;
    aliases;
    cat;
    vote;
    vc;
    samevc;
    dev;
    manage;
    desc;
    usage;
    premium;
    playing;
    dispatcher;
    data;
    /**@param {Oras} client */
    constructor(client) {
        this.client = client;
    }
}
//# sourceMappingURL=OrasCommand.js.map