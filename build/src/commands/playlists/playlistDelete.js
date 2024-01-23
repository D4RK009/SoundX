//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-delete";
          this.aliases = [];
          this.cat = "playlists";
          this.desc = "Delete a playlist";
          this.usage = "playlist-delete <name>";
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
            const name = args[0];
            if (!name) return message.channel.send(`Please provide a name for the playlist`);

            const hasPlaylist = PlaylistManager.hasPlaylist(user, name);

            if (!hasPlaylist) return message.channel.send(`You don't have a playlist with this name`);

            await PlaylistManager.deletePlaylist(user, name).catch((err) => {
                this.client.logger.error(err)
                return message.channel.send(`An error occured while deleting the playlist`);
            })

            return message.channel.send(`Successfully deleted playlist`);

            };
      }
  }