import "dotenv/config";
export default class OrasConfig extends Object {
    constructor() {
        super();
        this.token = "";
        this.botid = ""
        this.prefix = ".";
        this.playList = {
            maxPlaylists: 10,
            maxSongs: 30,
        }
        this.nodes = [
            {
                name: `SoundX`,
                url: `lava.link:80`,
                auth: `lava`,
                secure: false,
            },
        ];
        this.voteApi =
            "";
        this.webhooks = {
            guildCreate: "",
            guildDelete: "",
            Cmds: "",
        };
        
        this.server = "https://";
        this.botinvite = ``;
        this.server = "https://";
        this.botinvite = ``;
        this.spotiId = "6e5e869116404a7791dc8701559bbc24";
        this.spotiSecret = "545dd6dfe441412aaa84c6a38b9b2ceb";
        this.owners = ["992472529413349400"];
        this.color = "#f54c4c";
        this.supportId = "";
        this.spotiNodes = [
            {
                id: `SoundX`,
                host: `lava.link`,
                port: 80,
                password: `lava`,
                secure: false,
            },
        ];
        this.voteUrl = "https://top.gg/";
        this.setupBgLink =
            "";
    }
}
//# sourceMappingURL=Config.js.map
