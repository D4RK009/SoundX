import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";
import * as util from "util";
export default class OrasEval extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "eval";
        this.aliases = ["jadu", "exe", "puni"];
        this.cat = "dev";
        this.desc = "Helps in Evaluating a Javascript statement";
        this.usage = "eval <code>";
        this.manage = false;
        this.dev = true;
        this.exec = async (message, args, prefix) => {
            if (!["314599100811051008", "847770840266833961"].includes(message.author.id))
                return;
            let code = args.join(" ");
            if (!code)
                return message.reply({
                    content: `${this.client.emoji.cross} Please provide me some code to evaluate`,
                });
            let result;
            try {
                result = await eval(code);
                result = util.inspect(result, { depth: 0 });
            }
            catch (e) {
                result = util.inspect(e, { depth: 0 });
            }
            let but = new ButtonBuilder()
                .setCustomId(`dev_del`)
                .setLabel(`Delete`)
                .setStyle(ButtonStyle.Secondary);
            let ro = new ActionRowBuilder().addComponents([but]);
            return message.reply({
                content: `**Input:**\`\`\`js\n${code}\`\`\`**Output:**\`\`\`js\n${result}\`\`\``,
                components: [ro],
            });
        };
    }
}
//# sourceMappingURL=Eval.js.map