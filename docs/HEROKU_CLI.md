# Comands

### Create App

````bash
heroku create -a app-name
````

## `heroku apps`

[📄 Documentation](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-apps)

### Delete App
````bash
heroku apps:destroy

heroku destroy -a app-name
````

### Show Apps

````bash
heroku apps
````

### Create random app

````bash
heroku apps:create
````
> Crea una app con nombre random

### Show Favourite Apps

````bash
heroku apps
````

### Open app in browser

````bash
heroku apps:open node-auth-api-dev

heroku open -a app-name
````

### View Logs on console

````bash
heroku logs --tail
````

### Restart launch App.

````bash
heroku restart
````