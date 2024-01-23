import OrasCommand from "../../abstract/OrasCommand.js";
export default class OrasAvatar extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "avatar";
        this.aliases = ["av", "pfp", "pic"];
        this.cat = "utility";
        this.dev = false;
        this.usage = "avatar <user/member>";
        this.desc = "Shows the avatar of a user";
        this.vote = false;
        this.premium = {
            guild: false,
            user: false,
        };
        this.manage = false;
        this.vc = false;
        this.exec = async (message, args, prefix) => {
            if (!this.client.utils.checkServerPrem(message.guildId) &&
                !this.client.utils.checkServerPremStatus(message.guildId) &&
                !this.client.utils.checkUserPrem(message.author.id))
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`${this.client.emoji.cross} *You discovered a [Premium Feature](${this.client.config.server}).\nYou may buy our [Premium Plan](${this.client.config.server}) to avail this feature*`)
                    ],
                });
            let user;
            if (message.mentions.users
                .filter((x) => x !== this.client.user)
                .first())
                user = message.mentions.users
                    .filter((x) => x !== this.client.user)
                    .first();
            else if (args[0])
                user = await this.client.users.fetch(args[0]);
            else if (!args[0])
                user = message.author;
            if (!user)
                return message.reply({
                    embeds: [
                        this.client.utils
                            .errorEmbed()
                            .setDescription(`${this.client.emoji.cross} Please provide me a valid user!`),
                    ],
                });
            let mem = message.guild.members.cache.get(user.id);
            if (mem && mem.avatar !== null) {
                let msg = await message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`Choose the Avatar Options below`)
                            .setTitle(`Avatar`)
                            .setURL(`${this.client.config.voteUrl}`),
                    ],
                    components: [
                        this.client.utils.actionRow([
                            this.client.utils.button(`custom_id`, `Server Avatar`, 2, `server_av`),
                            this.client.utils.button(`custom_id`, `User Avatar`, 2, `usr_av`),
                        ]),
                    ],
                });
                let collector = await msg.createMessageComponentCollector({
                    filter: (b) => {
                        if (b.user.id === message.author.id)
                            return true;
                        else
                            return b.reply({
                                content: `${this.client.emoji.cross} You are not the avatar requester`,
                                ephemeral: true,
                            });
                    },
                    time: 100000 * 7,
                });
                collector.on("collect", async (interaction) => {
                    if (interaction.isButton()) {
                        if (interaction.customId === `server_av`) {
                            return interaction.update({
                                embeds: [
                                    this.client.utils
                                        .premiumEmbed(message.guild.id)
                                        .setDescription(`[\`JPG\`](${mem.displayAvatarURL({
                                        dynamic: true,
                                        size: 512,
                                        format: `jpg`,
                                    })}) | [\`PNG\`](${mem.displayAvatarURL({
                                        dynamic: true,
                                        size: 512,
                                        format: `png`,
                                    })}) | [\`GIF\`](${mem.displayAvatarURL({
                                        dynamic: true,
                                        size: 512,
                                        format: 512,
                                    })})`)
                                        .setImage(mem.displayAvatarURL({ dynamic: true, size: 512 }))
                                        .setTitle(`${mem.user.tag}'s Server Avatar`)
                                        .setFooter({
                                        text: `Requested By: ${message.author.tag}`,
                                    }),
                                ],
                                components: [],
                            });
                        }
                        else if (interaction.customId === `usr_av`) {
                            return interaction.update({
                                embeds: [
                                    this.client.utils
                                        .premiumEmbed(message.guildId)
                                        .setDescription(`[\`JPG\`](${mem.user.displayAvatarURL({
                                        dynamic: true,
                                        size: 512,
                                        format: `jpg`,
                                    })}) | [\`PNG\`](${mem.user.displayAvatarURL({
                                        dynamic: true,
                                        size: 512,
                                        format: `png`,
                                    })}) | [\`GIF\`](${mem.user.displayAvatarURL({
                                        dynamic: true,
                                        size: 512,
                                        format: `gif`,
                                    })})`)
                                        .setTitle(`${mem.user.tag}'s User Avatar`)
                                        .setFooter({
                                        text: `Requested By: ${message.author.tag}`,
                                    })
                                        .setImage(mem.user.displayAvatarURL({ dynamic: true, size: 512 })),
                                ],
                                components: [],
                            });
                        }
                    }
                });
                collector.on("end", async () => {
                    if (collector.collected)
                        return;
                    else if (!msg)
                        return;
                    else
                        return await msg.edit({
                            content: `Timed Out!`,
                            components: [],
                            embeds: [],
                        });
                });
            }
            else {
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`[\`JPG\`](${user.displayAvatarURL({
                            dynmaic: true,
                            size: 512,
                            format: `jpg`,
                        })}) | [\`PNG\`](${user.displayAvatarURL({
                            dynamic: true,
                            size: 512,
                            format: `png`,
                        })}) | [\`GIF\`](${user.displayAvatarURL({
                            dynamic: true,
                            size: 512,
                            format: `gif`,
                        })})`)
                            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
                            .setTitle(`${user.tag}'s Avatar`)
                            .setFooter({
                            text: `Requested By: ${message.author.tag}`,
                        }),
                    ],
                });
            }
        };
    }
}
//# sourceMappingURL=Avatar.js.map