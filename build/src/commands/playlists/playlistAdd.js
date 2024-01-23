//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-add";
          this.aliases = ["p-add"];
          this.cat = "playlists";
          this.desc = "Add a song to a playlist";
          this.usage = "playlist-add <playlist> <song>";
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
            const { PlaylistManager, shoukaku } = this.client;
            const { author: user } = message;
            const playlist = args.shift();
            const song = args.join(" ");
            
            if (!playlist) return message.channel.send(`Please provide a playlist name`);
            if (!song) return message.channel.send(`Please provide a song name`);

            const hasPlaylist = PlaylistManager.hasPlaylist(user, playlist);
            if (!hasPlaylist) return message.channel.send(`You don't have a playlist with this name`);

            const node = shoukaku.getNode();
            const  result = await node?.rest.resolve(`ytsearch:${song}`);

            if (!result?.tracks.length) return message.channel.send(`No results found`);

            const track = this.client.utils.track(result?.tracks.shift());
            
            await PlaylistManager.addSong(user, playlist, track)
            .catch((err) => {
                this.client.logger.error(err)
                return message.channel.send(`An error occured while adding the song`);
            })
            .then(() => {
                return message.channel.send({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`Successfully added "${track.info.title}" to \`${playlist}\``),
                    ],
                });
            })
    
          };
      }
  }