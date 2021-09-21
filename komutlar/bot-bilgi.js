const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args) => {
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL())
        .setColor(message.guild.me.displayColor)
        .setTitle(`📊 İstatistikler`)
        .setDescription(`👑 Yapımcım:          
<@758775600835198977>
 🖥️ Bellek Kullanımı:  
${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
 🛠️ Çalışma süresi:    
${duration}
 👥 Kullanıcılar:      
${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
 💻 Sunucular:         
${client.guilds.cache.size.toLocaleString()}
 📚 Kanallar:          
${client.channels.cache.size.toLocaleString()}
 📖 Discord.JS sürümü:  
v${Discord.version}
 ⏰ Ping:              
${client.ws.ping}
`)  

        .setThumbnail(client.user.avatarURL())
        .setFooter(`Cortana |2021 Tüm Hakları Saklıdır`,client.user.avatarURL())

    return message.channel.send(embed);
  
  
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot durum', 'i', 'bi', 'istatistikler', 'kullanımlar', 'botdurum', 'bd', 'istatisik', 'stats', 'stat'],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Botun istatistiklerini Gösterir',
  usage: 'istatistik'
};