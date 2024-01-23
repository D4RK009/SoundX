//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-create";
          this.aliases = ["p-c"];
          this.cat = "playlists";
          this.desc = "Create a playlist";
          this.usage = "playlist-create <name>";
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
            const { PlaylistManager, config: { playList} } = this.client;
            const { author: user } = message;
            const name = args[0];
            if (!name) return message.channel.send(`Please provide a name for the playlist`);

            const hasPlaylist = PlaylistManager.hasPlaylist(user, name);
            if (hasPlaylist) return message.channel.send(`You already have a playlist with this name`);

            const playlists = await PlaylistManager.getAllPlaylist(user);
            if (playlists.length >= playList.maxPlaylists) {
                return message.channel.send(`You can't have more than ${playList.maxPlaylists} playlists`);
            }

            await PlaylistManager.createPlaylist(user, name).catch((err) => {
                this.client.logger.error(err)
                return message.channel.send(`An error occured while creating the playlist`);
            })
            .then(() => {
                return message.channel.send(`Successfully created playlist`);
            })
          };
      }
  }