import { User } from "discord.js";
import OrasDatabase from "../../database/db.js";

export default class PlaylistManager {


  constructor(client) {
    this.config = client.config.playList;
    this.db = new OrasDatabase("playlist.sqlite");
    this.cache = new Map();

    this.createDb();
  }
  /**
   * This function is used to create playlist
   */
  async createDb() {
    this.db.prepare(`CREATE TABLE IF NOT EXISTS PLAYLIST(
      ID TEXT,
      USER TEXT,
      SONGS TEXT
  )`).run();
  }

  hasPlaylist(user, id) {
    if (!user?.id) throw new Error("Invalid User Provided");

    const data = this.db.prepare(`SELECT * FROM PLAYLIST WHERE USER = ? AND ID = ?`).get(user.id, id);
    return !!data;
  }

  /**
   * 
   * @param {import("discord.js").User} user 
   * @returns {Promise<import("../../index.d.ts").Playlist | undefined>}
   */
  async getPlaylist(user, id) {
    if (!user?.id) throw new Error("Invalid User Provided");

    const data = this.db.prepare(`SELECT * FROM PLAYLIST WHERE USER = ? AND ID = ?`).get(user.id, id);
    if (!data) return;

    return data;
  }

  /**
   * Get all playlist of a use.
   * @param {import("discord.js").User} user
   * @returns {Promise<import("../../index.d.ts").Playlist[]>}
   */
  async getAllPlaylist(user) {
    if (!user?.id) throw new Error("Invalid User Provided");

    const data = this.db.prepare(`SELECT * FROM PLAYLIST WHERE USER = ?`).all(user.id);
    if (!data) return [];
    return data;
  }

  /**
   * 
   * @param {User} user 
   * @param {string} id 
   * @returns {Promise<import("../../index.d.ts").Song[]>}
   */
  async getSongs(user, id) {
    if (!user?.id) throw new Error("Invalid User Provided");

    const data = this.db.prepare(`SELECT SONGS FROM PLAYLIST WHERE USER = ? AND ID = ?`).get(user.id, id);
    if (!data) return [];

    return JSON.parse(data.SONGS);
  }

  /**
   * 
   * @param {User} user 
   * @param {string} id 
   * @param {import("../../index.d.ts").Song} song 
   * @returns {Promise<import("../../index.d.ts").Song[]>}
   */
  async addSong(user, id, song) {
    if (!user?.id) throw new Error("Invalid User Provided");

    const data = this.db.prepare(`SELECT SONGS FROM PLAYLIST WHERE USER = ? AND ID = ?`).get(user.id, id);
    if (!data) return [];
    const songs = JSON.parse(data.SONGS);
    if (songs.length >= this.config.maxSongs) return
    if (songs.find((x) => x.track === song.track)) return;
    songs.push(song);

    this.db.prepare(`UPDATE PLAYLIST SET SONGS = ? WHERE USER = ? AND ID = ?`).run(JSON.stringify(songs), user.id, id);
    return songs;
  }

  async addSongs(user, id, songs) {
    const saved = [];

    const userSongs = await this.getSongs(user, id);
    let length = userSongs.length;

    for (const song of songs) {

      if (length >= this.config.maxSongs) break;
      const data = await this.addSong(user, id, song);
      if (userSongs.some((x) => x.encoded === song.encoded || x.track === song.track)) continue;

      saved.push(data);
      length++;
    }

    return saved;
  }

  async removeSong(user, id, song) {
    const data = this.db.prepare(`SELECT SONGS FROM PLAYLIST WHERE USER = ? AND ID = ?`).get(user.id, id);
    if (!data) return { deleted: false, songs: []};

    const songs = JSON.parse(data.SONGS);
    const index = songs.findIndex((x) => 
    x.track === song.track || x.encoded === song.encoded || x.info.identifier === song.info.identifier || x.info.title === song.info.title
    );
    if (index === -1) return { deleted: false, songs};
    
    songs.splice(index, 1);
    this.db.prepare(`UPDATE PLAYLIST SET SONGS = ? WHERE ID = ?`).run(JSON.stringify(songs), id);
    return { deleted: true, songs};
  }

  async deletePlaylist(user, id) {
    if (!user?.id) throw new Error("Invalid User Provided");

    const data = this.db.prepare(`DELETE FROM PLAYLIST WHERE USER = ? AND ID = ?`).run(user.id, id);
    return data;
  }

  async createPlaylist(user, playlist, songs = "[]") {
    if (!user?.id) throw new Error("Invalid User Provided");
    if (!playlist) throw new Error("Invalid Playlist Provided");

    const data = this.db.prepare(`INSERT INTO PLAYLIST VALUES(?,?,?)`).run(playlist, user.id, songs);
    return data;
  }

}
