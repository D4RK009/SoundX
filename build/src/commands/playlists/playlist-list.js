//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-list";
          this.aliases = ["p-list"];
          this.cat = "playlists";
          this.desc = "Show all your playlists";
          this.usage = "playlist-list";
          this.dev = false;
          this.manage = false;
          this.premium = {
              guild: false,
              user: false,
          };
          this.vc = false;
          this.samevc = false;
          /**
           * 
           * @param {Message<true>} message 
           * @param {string[]} args 
           * @param {string} prefix 
           */
          this.exec = async (message, args, prefix) => {
            const { PlaylistManager } = this.client;
            const { author: user } = message;

            const playlists = await PlaylistManager.getAllPlaylist(user);

            if (!playlists.length) return message.channel.send(`You don't have any playlists`);
            const desc = await Promise.all(playlists.map(async (p) => {
              const songs = await PlaylistManager.getSongs(user, p.ID);
              return `- **${p.ID}** - \`${songs.length}\` songs`;
          }));

            const embed = this.client.utils
                .premiumEmbed(message.guildId)
                .setTitle(`Your playlists`)
                .setDescription(desc.join("\n"));

            return message.channel.send({ embeds: [embed] });
          }
      }
  }