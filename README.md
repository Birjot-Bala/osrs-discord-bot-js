# osrs-discord-bot-js
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Deploy to Lambda](https://github.com/Birjot-Bala/osrs-discord-bot-js/actions/workflows/deploy.yml/badge.svg)
![Sync commands](https://github.com/Birjot-Bala/osrs-discord-bot-js/actions/workflows/sync.yml/badge.svg)
![Update tradeable items](https://github.com/Birjot-Bala/osrs-discord-bot-js/actions/workflows/update.yml/badge.svg)

## Description
An OSRS Discord bot that uses slash commands. Deployed to an AWS Lambda instance and triggered using an API Gateway. This project uses Github Actions to sync commands and deploy to the AWS Lambda.

This bot was originally implemented using Python and did not take advantage of slash commands. There was uncertaintly that development will continue on [discord.py](https://github.com/Rapptz/discord.py) and so I have decided to rewrite the bot using JavaScript. I have taken this opportunity to switch to using slash commands allowing me to use a combination of AWS API Gateway and AWS Lambda to have the bot up 24/7. Github Actions are used to sync any new commands or changes to commands as well as push any src folder updates to the AWS Lambda.

## Commands
- /wiki - Takes a query and searches the [OldSchool Runescape Wiki](https://oldschool.runescape.wiki/) for the top 3 related pages
- /itemid - Takes an item name, searches a list of tradeable items for matches and returns the top 3 matches
- /price - Takes an item ID and returns the latest high and low prices from the [OSRS Wiki Prices API](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices) 
- /trend - Takes an item ID and timestep and returns a chart using [QuickChart](https://quickchart.io/) displaying the price timeseries for 300 timesteps

