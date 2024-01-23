//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";
import OrasDispatcher from "../../wrapper/Dispatcher.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-removetrack";
          this.aliases = [];
          this.cat = "playlists";
          this.desc = "Remove a track from a playlist";
          this.usage = "playlist-removetrack <playlist> [track]";
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
            const { PlaylistManager , config: { playList }, shoukaku } = this.client;
            const { author: user } = message;
            const name = args.shift();
            const song = args.join(" ");

            if (!name) return message.channel.send(`Please provide a name for the playlist`);
            const hasPlaylist = PlaylistManager.hasPlaylist(user, name);
            if (!hasPlaylist) return message.channel.send(`You don't have a playlist with this name`);
            
            const node = shoukaku.getNode();
            const  result = await node?.rest.resolve(`ytsearch:${song}`);

            if (song && !result?.tracks?.length) return message.channel.send(`No results found`);

            let track;
            if (song) {
                track = this.client.utils.track(result?.tracks.shift())
            } else {
                track = dispatcher.current;
            }

            const { deleted, songs } = await PlaylistManager.removeSong(user, name, track);

            if (!deleted) return message.channel.send(`This playlist doesn't have this song or song not found`);

            return message.channel.send({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`Successfully removed \`${track.info.title}\` from \`${name}\``)
                        .setFooter({text: `${songs.length}/${playList.maxSongs} songs in the playlist`}),
                ],
            });
            
          };
      }
  }