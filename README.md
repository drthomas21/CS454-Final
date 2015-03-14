# CS454-Final
Final Project for CS454

## How To Setup:
1: Install [Mongodb](http://www.mongodb.org/downloads)
2: Connect to mongo (via Terminal):
```sh
$ mongo
```
3. Go to database and create an account
```js
use wishlist;
db.createUser({
	user: "cs_user",
	pwd: "password",
	roles: [{role: 'readWrite',db:'wishlist'}]
});
exit;
```
4. copy **config.json.sample** into **config.json** and make any necessary changes to the config file