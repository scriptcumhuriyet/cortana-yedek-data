const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
module.exports = async message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {



 
    
    var yasaklıkomut = db.fetch(`yasaklıkomut_${message.guild.id}.${cmd.help.name}`)
    if(yasaklıkomut) return message.channel.send("Bu komut sunucuda yasaklanmıştır.")
           
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};