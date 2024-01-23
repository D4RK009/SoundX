export default class OrasEmoji extends Object {
    constructor(client) {
        super();
      this.tick = "<:Tick:1173435123799162899>";
      this.cross = "<:cross:1173403948330258473>";
      this.playing = "<a:RD_nowplaying:1173401015056334850>";
      this.exclamation = "<:rrt_Warning:1174732056832528404>";
      this.queue = "<:queue:1174731585258537050>";
      this.info = "<:info:1174701102021750855>";
      this.defSearch = "<a:premium:1174730504239599676>";
      this.premium = "<a:premium:1174730504239599676>";
      this.invite = "<:invite:1173408213941624854>";
      this.support = "<:DSG_Help:1173434058991206421>";
      this.spotiSearch = "<:Spotify:1174728687405510776>";
      this.deezSearch = "<:Deezer:1174727924285460541>";
      this.vote = "<:topGG:1173420546738892881>";
      this.soundSearch = "<:soundcloud:1174727285287428138>";
        this.badges = {
          named: "<:owner:1073672248885518597>",
            owner: "<:musicowner:1174832846091849868>",
            dev: "<:developer:1174829903582077080>",
            admin: "<:staff:1175902296471781506>",
            codev: "<:devicon:1174827610912596002>",
            author: "<:author_avon:1129990460128108554>",
            friend: "<:friends:1174834633918140597>",
            vip: "<:vip:1174842816858443866>>",
            premiumUser: "<:premium:1174842816858443866>",
            mod: "<:mod:1174831392836825138>",
            staff: "<:staff_blurple:1174841768139817050>",
            supporter: "<:support:1174834540326441061>",
            user: "<:user:1174836189925232671>",
        };
        this.helpMenu = {
            music: "<:music:1128101319010435123>",
            home: "<:home:1128103269626032168> ",
            filters: "<:filters:1173781617723068426>",
            info: "<:Info:1128101207404183583>",
            utility: "<:utility:1128101404209336330>",
            allCommands: "<:AllCommands:1128101826634469436>",
            playlists: "💾",
        };
        this.setup = {
          pause: "<:pause:1173385897371238580>",
            resume: "<:play:1173385974932320327>",
            skip: "<:next:1173385830140739584>",
            previous: "<:previous:1173386053390962688>",
            shuffle: "<:shuffle:1173386251710246932>",
            author: "<:author:1174847587187171339>",
            nowPlaying: "<a:RD_nowplaying:1173401015056334850>",
            requester: "<:requester:1173396667974815837>",
            duration: "<:duration:1174692214803284048>",
            stop: "<:stop:1173386359248003152>",
            loop: "<:loop:1173385739241799681>",
            volLow: "<:volumdown:1173386462289469573>",
            volHigh: "<:volumeup:1173386524805566535>",
            fav: "<:fav:1173385624833769493>",
            autoplay: "<:infinity:1173385549726351433>",
            filters: "<:avonfilter:1129751347869265920>",
        };
        this.orasNew = {
          emote: "<a:RD_nowplaying:1173401015056334850>",
            nowPlaying: "<a:RD_nowplaying:1173401015056334850>",
            requester: "<:requester:1173396667974815837>",
            duration: "<:duration:1174692214803284048>",
            author: "<:author:1174847587187171339>",
            pause: "<:pause:1173385897371238580>",
            resume: "<:play:1173385974932320327>",
            skip: "<:farward:1173385416553013288>",
            fav: "",
            previous: "<:rewind:1173386157338398752>",
            stop: "<:stop:1173386359248003152>",
        };
        this.spotify = {
          emote: "<a:spotify:1129816498853138502>",
            filters: "<:filter:1100222067938435152>",
            nowPlaying: "<a:spotify:1129816498853138502>",
            requester: "<:requester:1173396667974815837>",
              duration: "<:duration:1174692214803284048>",
              pause: "<:pause:1173385897371238580>",
              author: "<:author:1174847587187171339>",
              resume: "<:play:1173385974932320327>",
              stop: "<:stop:1173386359248003152>",
              loop: "<:loop:1173385739241799681>",
              shuffle: "<:shuffle:1139766210213462066>",
              forward: "<:forward10:1129823372008759327>",
              backward: "<:backward:1129823401175949322>",
              volLow: "<:volumdown:1173386462289469573>",
              volHigh: "<:volumeup:1173386524805566535>",
              previous: "<:previous:1173386053390962688>",
              skip: "<:next:1173385830140739584>",
        };
        this.special = {
          emote: "<a:premium_avon:1064927294730272939>",
            nowPlaying: "<a:premium_avon:1064927294730272939>",
            requester: "<:requester:1173396667974815837>",
            duration: "<:duration:1174692214803284048>",
            pause: "<:pause:1173385897371238580>",
            author: "<:author:1174847587187171339>",
            resume: "<:play:1173385974932320327>",
            stop: "<:stop:1173386359248003152>",
            loop: "<:loop:1173385739241799681>",
            shuffle: "<:shuffle:1139766210213462066>",
            forward: "<:forward10:1129823372008759327>",
            backward: "<:backward:1129823401175949322>",
            volLow: "<:volumdown:1173386462289469573>",
            volHigh: "<:volumeup:1173386524805566535>",
            previous: "<:previous:1173386053390962688>",
            skip: "<:next:1173385830140739584>",
        };
        this.noButtons = {
      emote: "<a:RD_nowplaying:1173401015056334850>",
        nowPlaying: "<a:RD_nowplaying:1173401015056334850>",
        author: "<:author:1174847587187171339>",
        requester: "<:requester:1173396667974815837>",
        duration: "<:duration:1174692214803284048>",
        filters: "<:filter:1100222067938435152>",
      };
        this.simple = {
      emote: "<a:RD_nowplaying:1173401015056334850>",
        nowPlaying: "<a:RD_nowplaying:1173401015056334850>",
        requester: "<:requester:1173396667974815837>",
        author: "<:author:1174847587187171339>",
        duration: "<:duration:1174692214803284048>",
        filters: "<:filter:1100222067938435152>",
        pause: "<:pause:1173385897371238580>",
        resume: "<:play:1173385974932320327>",
        stop: "<:stop:1173386359248003152>",
        skip: "<:farward:1173385416553013288>",
        loop: "<:loop:1173385739241799681>",
      };
        this.oldStyle = {
      emote: "<a:RD_nowplaying:1173401015056334850>",
        nowPlaying: "<a:RD_nowplaying:1173401015056334850>",
        author: "<:author:1174847587187171339>",
        requester: "<:requester:1173396667974815837>",
        duration: "<:duration:1174692214803284048>",
      };
    }
}
//# sourceMappingURL=Emoji.js.map