import "dotenv/config";
export default class OrasConfig extends Object {
    constructor() {
        super();
        this.token = "";
        this.botid = "1092108135818350592"
        this.prefix = ".";
        this.playList = {
            maxPlaylists: 10,
            maxSongs: 30,
        }
        this.nodes = [
            {
                name: `Avon`,
                url: `lava.link:80`,
                auth: `lava`,
                secure: false,
            },
        ];
        this.voteApi =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNDMxNzE0MTg2NjY0NzU5MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjczNTI3OTYzfQ.WwA0KXh_nAQcBmR7BPqgLGyElYZheTQmguQfA2F6aNc";
        this.webhooks = {
            guildCreate: "https://discord.com/api/webhooks/1177529328645443584/8cBbsxE8OXFNPOptRSt_wTpPLZquNF6rrQp3FcaGfUdCIj0y6WI_zE59amDS-AmhjLRm",
            guildDelete: "https://discord.com/api/webhooks/1177529587492728882/1PjvkBwZjmiRjXSBqpTuD5lYKBb-dMWwNpzufORGfQl9U520t7dDUtCRH3ZnT71NJP8U",
            Cmds: "https://discord.com/api/webhooks/1177529841873059850/Gf0uP-ZWK7TXtMlnlioem3jGnDTQyuwrjaA2ayzmgoFv6USV5QKGqBzKfMzNfJD8tVnp",
        };
        
        this.server = "https://dsc.gg/o";
        this.botinvite = `https://discord.com/api/oauth2/authorize?client_id=1&permissions=8&scope=applications.commands%20bot`;
        this.server = "https://dsc.gg/officalmusical";
        this.botinvite = `https://discord.com/api/oauth2/authorize?client_id=1093791684896235551&permissions=8&scope=applications.commands%20bot`;
        this.spotiId = "6e5e869116404a7791dc8701559bbc24";
        this.spotiSecret = "545dd6dfe441412aaa84c6a38b9b2ceb";
        this.owners = ["992472529413349400", "847770840266833961", "838338447932391436"];
        this.color = "#f54c4c";
        this.supportId = "1101783002163449957";
        this.spotiNodes = [
            {
                id: `Avon`,
                host: `lava.link`,
                port: 80,
                password: `lava`,
                secure: false,
            },
        ];
        this.voteUrl = "https://top.gg/";
        this.setupBgLink =
            "https://media.discordapp.net/attachments/1073486337732268095/1167481525378482268/962b1244c00f1592a6dc2abd5a2c6610.webp?width=1164&height=655";
    }
}
//# sourceMappingURL=Config.js.map