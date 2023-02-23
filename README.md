# PopUpTeam

POPUPTEAM is built around the idea that if clients need a project/business designed, staffed or developed, we can connect them with a team of creatives looking for work on a freelance basis, with the ability to search for local profiles to improve the local freelance economy.

Development Board - https://tasks.office.com/falmouthac.onmicrosoft.com/Home/PlanViews/QljmKZUhmUaXG6Pi2WEfPZYAFoNH?Type=PlanLink&Channel=Link&CreatedTime=638016053231940000

Business Proposal - https://falmouthac-my.sharepoint.com/:w:/r/personal/lw254830_falmouth_ac_uk/Documents/BUSINESS%20PROPOSAL.docx?d=wcbc35bb313de4d5d8861f9718578ae22&csf=1&web=1&e=SqXLP4

Presentation - https://falmouthac-my.sharepoint.com/:p:/g/personal/lw254830_falmouth_ac_uk/EV9hNp5UwwNNtBTYv3ZOwhMB3BZBQjOfu-hx6oZfkBsprQ?e=CLRXOC

## Contents

- [PopUpTeam](#popupteam)
  - [Contents](#contents)
  - [Main Features](#main-features)
  - [Repository Layout](#repository-layout)
    - [Main](#main)
    - [Documentation](#documentation)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [User Guide](#user-guide)
  - [Commit Message Key](#commit-message-key)

## Main Features

** Features here **

## Repository Layout

### Main

This branch contains:

- Source code
- License.
- Readme file.

### Documentation

This branch contains:

- Presentation
- Buissnesss plan
- Wireframes
- Kanban link

## Installation

### Prerequisites

- Node Package Manager [Nodejs](https://nodejs.org/en/download/)
- File manager (File explorer recommended for windows users.)
- Web browser (Google Chrome is recommended.)
- Integrated Development Environment (IDE) (Visual Studio Code is recommended (https://code.visualstudio.com/download))
- Command Line Interface (CLI) (Git Bash is recommended (https://git-scm.com/downloads))
- SQL database browser (mySQL workbench is recommended)

** Optional **

- Repository Browser (Recommended GitHub desktop (https://desktop.github.com/))

### User Guide

1. If you have downloaded the optional repository browser clone the repository and pull.
   If you haven’t downloaded the repository browser download a zip folder from the repository under 'code' tab then the 'code' dropdown button then click download zip.
   Then extract the folder somewhere in your files.

2. If you are using an IDE open the entire project folder in the IDE. If you aren’t skip to the next step.

3. Within the project folder open your CLI by navigating to where you have stored the project folder.

4. Enter the following into your CLI. (This was done using GitBash and therefore commands might differ.)

`$ cd client`

`$ npm install`

5. In a new CLI instance:

`$ cd server`

`$ npm install`

6. In a third CLI instance:

`$ cd kanban-server`

`$ npm install`

`$ npx sequelize db:migrate` - This is generally unnecessary (Creates database file)

7. Now in the current

`$ npm run dev`

8. And in the previous instance

`$ npm run dev`

9. Finally in the third instance

`$ npm run start`

10. Finally enter the local URL (http:localhost:3000) into your web browser. Database functionality can be found (http:localhost:3000/dev)
    Additional if you wish to view the database outside of the source code enter the information found in 'server/config/db.js' into mySQLworkbench as a new connection in the same format it appears here.

## Commit Message Key

** If any words used in the commit log used before the content of the message are unfamilar refer to this key **

- feat: A feature that has been added.
- fix: Bug fix.
- docs: Changes relating to documentation.
- style: Formatting, missing code, white space (This doesnt apply to CSS.)
- refactor: Maintainabilty or a functions method has been altered.
- dep: Dependancies added to the project.
- chore: Miscellaneous such as altering assets.
- del: Deleted or removed unused code, files or other assets.
