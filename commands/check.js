// npmjs packages
const Discord = require('discord.js');
const fs = require('fs');

// configuration
const config = require('../config.json');

// export command
module.exports = {
    
    // command name
	name: 'stock',

    // command description
	description: 'Check a service.',

    // command
	execute(message) {

     

        // stock files path
        const filePath = `${__dirname}/../stock/pizza.txt`;

        // lines
        let lines = [];

        // file to read
        var fileContents;

        // try to read file
        try {

            // read file
            fileContents = fs.readFileSync(filePath, 'utf-8')

        // if error
        } catch (error) {

            // if error
            if (error) {
                
                // send message to channel
                message.channel.send(
                    "error"

                    
                    
                );

                // cancel
                return;
            };
        };

        // get lines
        fileContents.split(/\r?\n/).forEach(function (line) {

            // push lines
            lines.push(line);
        });

        // üzenet küldése csatornába
        message.channel.send(

            // embed
            new Discord.MessageEmbed()
            .setColor(config.color.red)
            .setTitle(`Stock!`)
            .setDescription(`\`Pizza Codes:\` **${lines.length}** `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
        );
    },
};