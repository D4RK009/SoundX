import OrasCommand from "../../abstract/OrasCommand.js";
export default class Invite extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "invite";
        this.aliases = ["inv"];
        this.desc = "Provides you with the Invite link of the bot";
        this.usage = "invite";
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
                      .setDescription(`Here is my Invite link <3`)
              ],
                components: [
                    this.client.utils.actionRow([
                        this.client.utils.button(`link`, `Invite Me`, null, null, `${this.client.config.botinvite}`, this.client.emoji.invite),
                    ]),
                ],
            });
        };
    }
}
//# sourceMappingURL=Invite.js.map