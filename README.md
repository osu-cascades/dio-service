# dio-web

## migrations
create new model: `$ node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string`
migrate up: `$ node_modules/.bin/sequelize db:migrate`
migrate down: `$ node_modules/.bin/sequelize db:migrate:undo`

