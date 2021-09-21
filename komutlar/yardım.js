const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
exports.run = async (client, message, args) => {

  let prefix = "c!" 


  const embed = new Discord.MessageEmbed()
  .setTitle("Cortana Müzik Menüsü")
  .setDescription(`
  ▶️ ${prefix}play - İstediğiniz müziği açarsınız. 
  ⏹ ${prefix}stop - Müziği kapatırsınız. 
  🌱 ${prefix}np - Çalan müzik hakkında bilgi alırsınız. 
  ⏭️ ${prefix}skip - Çalan müziği geçersiniz. 
  📶 ${prefix}queue - Müzik sırasını görürsünüz. 
  🔆 ${prefix}volume - Sesi ayarlarsınız. 
  ⏸ ${prefix}pause - Müziği durdurursunuz. 
  ⏺️ ${prefix}resume - Duran müziği decam ettirsiniz.
  ➖ ${prefix}remove - Müzik sırasından şarkı çıkarırsınız. 
  🔰 ${prefix}lyrics - Müziğin sözlerine bakarsınız. .
  


  BETA 0.0.2 | Tüm Sistemler Baştan Kuruluyor!`)
.setColor("BLUE")//// embed örnektir siz kendinize göre düzenleyin
  let button = new MessageButton()
            .setLabel("💥 Mesajı Sil 💥")
            .setStyle("red")
            .setID("yardım")
        await message.channel.send('', {embed: embed, component: button})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yardım", "espri-yap"],

    permLevel: 0
  };
  
  exports.help = {
    name: 'müzik',
    description: 'yardım',
    usage: 'yardım'
  }