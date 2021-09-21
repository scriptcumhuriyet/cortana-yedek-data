const Discord = require('discord.js')
const db = require('quick.db');
exports.run = function(client, message, args) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komudu kullanmak için yeterli yetkin yok.")
  if(!args[0]) return message.channel.send("Doğru kullanım: `!yasaklı-komut ekle/kaldır`")
  var komutlar = client.commands.map(a => a.help.name)
  if(args[0] === "ekle"){
     let komut = args[1]
  if(!komut) return message.channel.send("Yasaklamak istediğin komudu girmelisin")
  if(!komutlar.some(x=> x == komut)) return message.channel.send("Böyle bir komut bulunamadı.")
  if(db.has(`yasaklıkomut_${message.guild.id}.${komut}`)) return message.channel.send("Bu komut zaten yasaklı.")
  db.set(`yasaklıkomut_${message.guild.id}.${komut}`, "yasaklı")
  message.channel.send("Komut başarıyla yasaklandı.")
  }
  if(args[0] === "kaldır"){
     let komut = args[1]
  if(!komut) return message.channel.send("Yasaklamasını kaldırmak istediğin komudu girmelisin")
  if(!komutlar.some(x=> x == komut)) return message.channel.send("Böyle bir komut bulunamadı.")
  if(!db.has(`yasaklıkomut_${message.guild.id}.${komut}`)) return message.channel.send("Bu komut zaten yasaklı değil.")
  db.delete(`yasaklıkomut_${message.guild.id}.${komut}`)
  message.channel.send("Komut başarıyla yasaklı komutlardan kaldırıldı")
  }
 

}
exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'yasaklı-komut',

  description: 'description',

  usage: 'usage'

};