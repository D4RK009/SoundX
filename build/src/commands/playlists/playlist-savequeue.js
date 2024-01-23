//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";
import OrasDispatcher from "../../wrapper/Dispatcher.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-savequeue";
          this.aliases = [];
          this.cat = "playlists";
          this.desc = "Save the queue to a playlist";
          this.usage = "playlist-savequeuet <playlist>";
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
            const { PlaylistManager, config: { playList } } = this.client;
            const { author: user } = message;
            const name = args[0];

            if (!name) return message.channel.send(`Please provide a name for the playlist`);
            const hasPlaylist = PlaylistManager.hasPlaylist(user, name);
            if (!hasPlaylist) return message.channel.send(`You don't have a playlist with this name`);
            
            if (!dispatcher.queue.length) return message.channel.send("The queue is empty");

            const songs = await PlaylistManager.addSongs(user, name, dispatcher.queue)

            return message.channel.send({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`Successfully saved \`${songs.length}\` songs to \`${name}\``)
                        .setFooter({text: `${songs.length}/${playList.maxSongs} songs in the playlist`}),
                ],
            });
          };
      }
  }