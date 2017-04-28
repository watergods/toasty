const config = require('../config.json'),
      superagent = require('superagent');
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = (client, guild) => {
    client.user.setGame(`;help | ${client.guilds.size.toLocaleString()} Servers!`);

    const content = clean(`:white_check_mark: I've been invited to server **${guild.name}**\nServer ID: **${guild.id}**\nMembers: **${guild.memberCount}**\nRegion: **${guild.region}**`);
    const id = '303203639101620224';
    return new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
      .set('Authorization', `Bot ${client.token}`).send({ content })
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

    const discordpwPayload = {
        server_count: client.guilds.size
    }; // eslint-disable-line camelcase

    return request({
        method: 'POST',
        uri: 'https://bots.discord.pw/api/bots/' + client.user.id + '/stats',
        headers: {
            Authorization: config.discordpwToken
        },
        body: discordpwPayload,
        json: true
    }).then(() => {
        console.log(`Sent guild count to bots.discord.pw with ${client.guilds.size.toLocaleString()} guilds.`);
    });
}