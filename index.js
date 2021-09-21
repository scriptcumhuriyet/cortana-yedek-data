const Discord = require("discord.js");
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");
const db = require("quick.db");
const axios = require("axios");

const client = new Discord.Client();
const ms = require("ms");
require("./util/eventLoader")(client);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.on('ready', () => require('quick.db').set('start', Date.now()))


require('discord-buttons')(client);
client.on('clickButton', async (button) => {
      if(button.id !== "yardım") return;
      client.channels.cache.get(button.channel.id).messages.fetch({ around: button.message.id, limit: 1 }).then(messages => {
            messages.first().delete()
      })
      await button.reply.send('Yardım menüsü mesajı silindi.', true);
             
})



client.on('ready', async () => {


   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  client.user.setActivity(`c!yardım | S.= ${client.guilds.cache.size}! , K.=${client.users.cache.size}! `);
  console.log("CodeWork Akıyor!!")
});
 




client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


client.unload = command => {
  return new Promise((resolve, reject) => { 
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) { 
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login('ODg2NjU0NDExMzY2MDg4ODM1.YT4vRA.jhzk_n7WyvYjowdGt_qxPumOiCQ')







const { MusicBot } = require('discord-music-system'); // npm i discord-music-system Yap terminal de falan

client.musicBot = new MusicBot(client, {
    ytApiKey: 'AIzaSyDJIEyE2vi7oXm4EthRsmrfht2S8d41zf8', // yt ap key lazım ab YouTube da videoları var
    prefix: 'c!', // Botunuzun Prefixiniz yaz fln
    language: 'en' // değiştirme Türkçe yok xd
}); //Github: iUgur

client.on('message', async message => {
    if(message.author.bot) { //Space Giveaway Ekle yaw
        return;
    }; //Discord: iUgur#7464
    client.musicBot.onMessage(message); //Yardım menüsü de var Bi dal al istersen xd
}); //buraya eller isen çalışmaz anla yaw 

 //yapay zeka

 client.on("message", async message => {
  const Database = require("plasma-db");
const db = new Database("./database.json"); 
  const ai = require('@codare/codare.ai')
let kanal = db.fetch(`yapayzekakanal_${message.guild.id}`)
if(!kanal) return;
if(message.channel.id !== kanal) return;
if(message.author.bot == true) return;
let soru = message.content;
ai.sor(soru).then(enginar => {
return message.channel.send(enginar) 
});
})


//aktinator
const akinator = require("discord-tr-akinator")

client.on("message", async message => {
    if(message.content.startsWith(`c!akinator`)) {
        akinator(message, client);
    }
});
