# Biolink

Inspired by @craftzdog's Link-In-Bio project and Linktree musician pages, I've built a simple React link page for my Instagram bio.

## Features

1. A simple array of JS objects containining link titles and addresses, as well as a special flavour for YouTube embeds.  Adding links is as simple as adding a new object into the array.

2. A "Socials" grid of React components which include a tooltip indicating platform names for users unaware of platform branding.

## Learning Experiences

- first time using Lighthouse scoring and analysis to optimize perforance
- first time using component libraries (Radix and Mantine in this case) to implement handy UI features
  - I tried a few options before settling on the simplest solutions for tooltip and animation functionality
  - animation implementation revealed an issue with the flexbox gap property which led me back to margins for spacing

## To Do

- create data folder for mutiple links lists
- pass in links data as a prop for LinksList(s) for reusability
- give images width and height to prevent ui jumps
- move css into components for easier maintenence
- iterate into SocialIconsGrid instead of hard-coding
