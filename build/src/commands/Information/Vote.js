import OrasCommand from "../../abstract/OrasCommand.js";
export default class Vote extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "vote";
        this.aliases = [];
        this.desc = "Gives you the vote link for the bot";
        this.usage = "vote";
        this.cat = "info";
        this.exec = async (message, args, prefix) => {
              return message.reply({
              embeds: [
                  this.client.utils
                      .premiumEmbed(message.guildId)
                      .setAuthor({
                      name: `Vote ${this.client.user.username}`,
                      iconURL: this.client.user.displayAvatarURL(),
                  })
                      .setDescription(`Click the button down below to vote <3`)
              ],
                components: [
                    this.client.utils.actionRow([
                        this.client.utils.button(`link`, `Vote Me`, null, null, `${this.client.config.voteUrl}`, this.client.emoji.vote),
                    ]),
                ],
            });
        };
    }
}
//# sourceMappingURL=Vote.js.map