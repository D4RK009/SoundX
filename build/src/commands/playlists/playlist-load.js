//@ts-check
import { Message } from "discord.js";
import OrasCommand from "../../abstract/OrasCommand.js";


export default class PlaylistCreate extends OrasCommand {
      constructor(client) {
          super(client);
          this.name = "playlist-load";
          this.aliases = ["p-load"];
          this.cat = "playlists";
          this.desc = "Load a playlist into the queue";
          this.usage = "playlist-load <playlist>";
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
           */
          this.exec = async (message, args, prefix) => {
            const { PlaylistManager, shoukaku } = this.client;
            const { author: user } = message;
            const playlist = args.shift();
            
            if (!playlist) return message.channel.send(`Please provide a playlist name`);

            const hasPlaylist = PlaylistManager.hasPlaylist(user, playlist);
            if (!hasPlaylist) return message.channel.send(`You don't have a playlist with this name`);

            const tracks = await PlaylistManager.getSongs(user, playlist);

            if (!tracks.length) return message.channel.send(`This playlist is empty`);

            const node = shoukaku.getNode();
            
            for (const track of tracks) {
              const dispatcher = await this.client.api.handle(message.guild, message.member, message.channel, node, track);
              dispatcher?.play();
            }

            PlaylistManager.cache.set(message.author.id, {
              name: playlist,
              songs: tracks.map((t) => ({
                title: t.info.title,
                identifier: t.info.identifier,
                url: t.info.uri,
                duration: t.info.length,
              }))
            })
            return message.channel.send({
              embeds: [
                  this.client.utils
                      .premiumEmbed(message.guildId)
                      .setDescription(`Successfully loaded playlist: \`${playlist}\` with \`${tracks.length}\` songs`),
              ],
          });
          };
      }
  }