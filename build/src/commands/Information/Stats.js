import OrasCommand from "../../abstract/OrasCommand.js";
import ms from 'ms';
import { cpu } from "systeminformation";
import { cpus, totalmem } from "node:os";
export default class Stats extends OrasCommand {
  constructor(client) {
    super(client);
    this.name = "stats";
    this.aliases = ["st", "stat", "botinfo", "bi"];
    this.desc = "Informs you about the current statitics of the bot";
    this.usage = "stats";
    this.cat = "info";
    this.exec = async (message, args, prefix) => {
      let connectedchannelsamount = 0;
      let guilds = client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {

      }
      if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
      let totalChannelConnected = 0;
      let totalNode = client.shoukaku.nodes.size;
      let totalMusicPlaying = 0;

      return message
        .reply({
          embeds: [
            this.client.utils
              .embed()
              .setAuthor({
                name: `SoundX Stats`,
                iconURL: this.client.user.displayAvatarURL(),
              })
              .setThumbnail(this.client.user.displayAvatarURL())
              .setDescription(`*Hey, It's SoundX A Quality Music Bot With Breathtaking Features For Greater Experience While On Discord. SoundX Is Making Music More Enhanced In Discord. Try SoundX Now*`)
          .addFields([
            {
              name: `> <:Stats:1177890162009710643> - Bot Information`,
              value: `\`\`\`js
          Bot's Tag: ${this.client.user.tag}\nTotal Servers: ${await this.client.cluster
                .broadcastEval((x) => x.guilds.cache.size)
                .then((result) => result.reduce((a, b) => a + b, 0))}\nTotal Users: ${await this.client.cluster
                  .broadcastEval((c) => c.guilds.cache
                    .filter((x) => x.available)
                    .reduce((a, g) => a + g.memberCount, 0))
                  .then((r) => r.reduce((acc, memberCount) => acc + memberCount, 0))}\nBot's Version: 2.1.0\nTotal Channels: ${await this.client.cluster
                    .broadcastEval((x) => x.channels.cache.size)
                    .then((r) => r.reduce((a, b) => a + b, 0))}\`\`\``,
            },
          ])
          .addFields([
            {
              name: `> <:speaker:1177889234187731036> - Voice Information`,
              value: `\`\`\`js
          Voice Connected: ${connectedchannelsamount}\nNode:  ${totalNode}\nPlaying: ${totalMusicPlaying}\`\`\``,
            },
          ])
          .addFields([
          {
            name: `> <:system:1178220251062734928> - System Information`,
            value: `\`\`\`js
            Cpu Usage: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\nMemory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%\nWebsocket Latency: ${client.ws.ping}ms\nDiscord.js v14.11.0\nUptime: ${ms(client.uptime)}\`\`\``,
          },
          ])
          ],
          components: [
            this.client.utils.actionRow([
              this.client.utils.button(`link`, `Invite Me`, null, null, `${this.client.config.botinvite}`),
              this.client.utils.button(`link`, `Support`, null, null, `${this.client.config.server}`),
              this.client.utils.button(`link`, `Premium`, null, null, `${this.client.config.server}`),
            ]),
          ],
        })
    };
  }
}
//# sourceMappingURL=Stats.js.map