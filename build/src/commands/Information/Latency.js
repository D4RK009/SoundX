import OrasCommand from "../../abstract/OrasCommand.js";
export default class OrasLatency extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "ping";
        this.cat = "info";
        this.desc = "Informs you about the bot's latency";
        this.aliases = ["ping", "pong"];
        this.exec = async (message, prefix, args) => {
return message?.reply({
                content: `Experiencing Latency with Discord's Gateway: \`${this.client.ws.ping}\`ms!`,
            });
        };
    }
}
//# sourceMappingURL=Latency.js.map