// npmjs packages
const Discord = require('discord.js');
const fs = require('fs');

// configuration
const config = require('../config.json');

// collections
const generated = new Set();

// export command
module.exports = {
    
    // command name
	name: 'pizza',

    // command description
	description: 'Generate a specified service, if stocked.',

    // command
	execute(message) {
        message.delete();
        // if gen channel
        if (message.channel.id === config.genChannel) {

            // if generated before
            if (generated.has(message.author.id)) {

                // send message to channel
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('Cooldown')
                    .setDescription('Please wait before executing another command!')
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setTimestamp()
                );

                // cancel
                return;

            // if not generated before
            } else {

                

                // stock files path
                const filePath = `${__dirname}/../stock/pizza.txt`;

                // read the file
                fs.readFile(filePath, function (error, data) {

                    // if no error
                    if (!error) {

                        // text file content to string
                        data = data.toString();

                        // find position
                        const position = data.toString().indexOf('\n');

                        // find first line
                        const firstLine = data.split('\n')[0];

                        // if cannot find first line
                        if (position === -1) {

                            // send message to channel
                            message.channel.send(

                                // embed
                                new Discord.MessageEmbed()
                                .setColor(config.color.red)
                                .setTitle('Out Of Stock')
                                .setDescription(`**I Ran Out Of Pizza :O**`)
                                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                                .setTimestamp()
                            );

                            // cancel
                            return;
                        };

                        const embed1 = new Discord.MessageEmbed()
                        .setColor(config.color.red)
                        .setAuthor("Pizza Bot", `https://locations.pizzahut.com/permanent-b0b701/assets/images/pizzahut/header-logo.64264f56.png`)
                        .setTitle("Pizza Hut Personal Pan Pizza")
                        .setDescription(` 
                        **1. Go to https://pizzahut.com
                        2. Order a Personal Pan Pizza.
                        3. Pick up and enjoy!** `)
                        .setImage("https://cdn.discordapp.com/attachments/859639804798828547/859647487228903435/unknown.png")
                        .setTimestamp();





                        message.author.send(embed1)
                        message.author.send( 

                            //embed

                            
                            new Discord.MessageEmbed()
                            .setAuthor("Pizza Bot", `https://locations.pizzahut.com/permanent-b0b701/assets/images/pizzahut/header-logo.64264f56.png`)
                            .setColor(config.color.red)
                            .setTitle('Generated Pizza Code')
                            .addField('Coupon Code', `\`\`\`${firstLine}\`\`\``)
                            .setTimestamp()
                        ).then(message.author.send(`\`${firstLine}\``));

                        // if the service generated successful (position)
                        if (position !== -1) {

                            // text file to string and change position
                            data = data.substr(position + 1);

                            // write file
                            fs.writeFile(filePath, data, function (error) {

                                // send message to channel
                                message.channel.send(

                                    // embed
                                    new Discord.MessageEmbed()
                                    .setColor(config.color.green)
                                    .setTitle('Pizza generated!')
                                    .setDescription(`Check your DMs ${message.author}! *Make Sure DM's Are on :)*`)
                                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                                    .setTimestamp()
                                );

                                // add the message author to cooldown collection
                                generated.add(message.author.id);

                                // set cooldown (in millisec)
                                setTimeout(() => {

                                    // remove the message author from cooldown collection after timeout
                                    generated.delete(message.author.id);
                                }, config.genCooldown);

                                // if error
                                if (error) {

                                    // write to console
                                    console.log(error);
                                };
                            });

                        // if no lines
                        } else {

                            // send message to channel
                            message.channel.send(

                                // embed
                                new Discord.MessageEmbed()
                                .setColor(config.color.red)
                                .setTitle('Gen error!')
                                .setDescription(`I do not find any codes i need restock`)
                                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                                .setTimestamp()
                            );

                            // cancel
                            return;
                        };

                    // if error
                    } else {

                        // send message to channel
                        message.channel.send(

                            // embed
                            new Discord.MessageEmbed()
                            .setColor(config.color.red)
                            .setTitle('Gen error!')
                            .setDescription(`I do not find the \`${args[0]}\` service in my stock!`)
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                            .setTimestamp()
                        );

                        // cancel
                        return;
                    };
                });
            };

        // if not gen channel
        } else {

            // send message to channel
            message.channel.send(

                // embed
                new Discord.MessageEmbed()
                .setColor(config.color.red)
                .setTitle('Prohibited activity!')
                .setDescription(`You can use the ${config.prefix}pizza command only in <#${config.genChannel}> channel!`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
            );
        };
	},
};