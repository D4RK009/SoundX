import OrasCommand from "../../abstract/OrasCommand.js";
export default class Support extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "support";
        this.aliases = ["supp"];
        this.desc = "Provides you with the server link for the bot's support";
        this.cat = "info";
        this.exec = async (message, args, prefix) => {
              return message.reply({
              embeds: [
                  this.client.utils
                      .premiumEmbed(message.guildId)
                      .setAuthor({
                      name: `${this.client.user.username}`,
                      iconURL: this.client.user.displayAvatarURL(),
                  })
                      .setDescription(`Here is my Support link <3`)
              ],
                components: [
                    this.client.utils.actionRow([
                        this.client.utils.button(`link`, `Support Server`, null, null, `${this.client.config.server}`, this.client.emoji.support),
                    ]),
                ],
            });
        };
    }
}
//# sourceMappingURL=Support.js.map