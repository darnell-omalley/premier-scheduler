# Purpose

The purpose behind the Premier Scheduler was to create a bot that can create Discord scheduled events for the Valorant Premier season. Attempting to coordinate a team of 7 accross several timezones proved challenging. Scheduled events allowed for time-localized items the team could "Interest" to show they were avialable to be on the roster.

# Installation

- Clone the repository to a computer that has (or will have) nodejs and npm installed.
- Enter the directory of the cloned repository and run `npm install` to install all the required dependencies.
- Fill in the `config.json` file with your account specific details.
- Adjust team specific details in `index.js` such as the voice channel ID, and the map order.
- Run `index.js` to create the Premier scheduled events.

# Notes

There is no error checking or persitence built into the bot. The worst that will happen is you will have incorrect scheduled events you will have to manually delete.

There are no arguments or parameters on execution, just use `node index.js` to start execution. The events will be scheduled according to the configurations in the code.

It's advised the script is run on a host with a solid internet connection. I found execution on my small Linux box on a 30Mbps upload Spectrum Internet connection to sometimes not perform well (i.e. socket timeouts). The script currently sits on an AWS Lightsail instance with the following specs: 512 MB RAM, 2 vCPUs, 20 GB SSD
