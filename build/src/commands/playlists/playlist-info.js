//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";
import OrasDispatcher from "../../wrapper/Dispatcher.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-info";
          this.aliases = [];
          this.cat = "playlists";
          this.desc = "Display info about a playlist";
          this.usage = "playlist-info <playlist>";
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
           * @param {OrasDispatcher} dispatcher
           */
          this.exec = async (message, args, prefix, dispatcher) => {
            const { PlaylistManager , config: { playList } } = this.client;
            const { author: user } = message;
            const name = args[0];

            if (!name) return message.channel.send(`Please provide a name for the playlist`);
            const hasPlaylist = PlaylistManager.hasPlaylist(user, name);
            if (!hasPlaylist) return message.channel.send(`You don't have a playlist with this name`);
            const current = dispatcher?.current;

            const playlist = await PlaylistManager.getPlaylist(user, name);
            const songs = JSON.parse(`${playlist?.SONGS}`);
            const embed = this.client.utils.premiumEmbed(message.guildId)
              .setTitle(`Playlist info for ${name}`)
              .addFields([
                {
                  name: "Songs",
                  value: `${songs.length}/${playList.maxSongs}`
                }
              ])

            if (current) {
              const cachePlaylist = PlaylistManager.cache.get(user.id);
              const cacheSong = cachePlaylist?.songs.find((s) => s.title === current.info.title || s.identifier === current.info.identifier || s.url === current.info.uri);
              if (cacheSong) {
                embed.addFields([
                  {
                    name: `Current Song playing in the playlist`,
                    value: `[${current.info.title}](${current.info.uri})`
                  }
                ])
              }
            }

            return message.channel.send({
              embeds: [embed]
            })


          };
      }
  }