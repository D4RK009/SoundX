//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";
import OrasDispatcher from "../../wrapper/Dispatcher.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-savecurrent";
          this.aliases = [];
          this.cat = "playlists";
          this.desc = "Save the current song to a playlist";
          this.usage = "playlist-savecurrent <playlist>";
          this.dev = false;
          this.manage = false;
          this.premium = {
              guild: false,
              user: false,
          };
          this.vc = true;
          this.samevc = true;
          /**
           * 
           * @param {Message<true>} message 
           * @param {string[]} args 
           * @param {string} prefix 
           * @param {OrasDispatcher} dispatcher
           */
          this.exec = async (message, args, prefix, dispatcher) => {
            const { PlaylistManager , config: { playList } } = this.client;
            const { author: user } = message;
            const name = args[0];

            if (!name) return message.channel.send(`Please provide a name for the playlist`);
            const hasPlaylist = PlaylistManager.hasPlaylist(user, name);
            if (!hasPlaylist) return message.channel.send(`You don't have a playlist with this name`);
            
            if (!dispatcher.current) return message.channel.send(`There is no song playing`);

            const songs = await PlaylistManager.getSongs(user, name);

            if (songs.length >= playList.maxSongs) return message.channel.send(`This playlist is full`);

            await PlaylistManager.addSong(user, name, dispatcher.current)
            .catch((err) => {
                this.client.logger.error(err)
                return message.channel.send(`An error occured while saving the song`);
            })
            .then(() => {
                return message.channel.send({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`Successfully saved \`${dispatcher.current.info.title}\` to \`${name}\``)
                            .setFooter({text: `${songs.length + 1}/${playList.maxSongs} songs in the playlist`}),
                    ],
                });
            })
          };
      }
  }