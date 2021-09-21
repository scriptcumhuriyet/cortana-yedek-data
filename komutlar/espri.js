const Discord = require("discord.js");
const { get } = require("snekfetch");

exports.run = async (client, message) => {
  const espri = await get("https://api.emirkabal.com/espri").set(
    "Authorization",
    "API ANAHTARINIZ."
  );
  if (!espri || !espri.body || !espri.body.mesaj)
    return console.log("Hata oluştu,Lütfen API anahtarınızı kontrol ediniz.");
    
  
  const keera = new Discord.MessageEmbed()
  .setDescription('**Espri Yükleniyor...**')
    .setColor('BLUE')
          .setFooter(
        ` ${client.user.username} Bot ${new Date().getFullYear()}`,
        message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
    let mesaj = await message.channel.send(keera)
    
     setInterval(() => {

   const keera = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setFooter(
        `  ${client.user.username} Bot ${new Date().getFullYear()}`,
        message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setDescription(`**Espri:**
      ${espri.body.mesaj}
         
      `)
               mesaj.edit(keera);
      
    }, 3000)
};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["espiri", "espri-yap"],
  permLevel: 0
};

exports.help = {
  name: "espri",
  description: "Espri yapar.",
  usage: "espri"
};