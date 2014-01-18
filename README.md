# Questions and Answers

This is a prototype to create a generic service shell to deliver a single page application. The service layer contains jbuilder templates to manage json requests, handlerbar templates to render page views, and a jquery client library to enable single page functionality.

The for this demo the service mounts a rails engine for basic question and answer functionality.


### Versions:
* Ruby 2.X.X
* Rails 4.X.X

### System dependencies:
	This project is configured to use Postgres, be sure to create a root user with blank password.
	There is also the option to use SQLite, be sure to update the database.yml
 
### Configuration:

```shell
	$ bundle
```

### Database creation and initialization
	* development & test:
	```shell
		$ rake db:setup
	```

### Start app
```shell
	rails s
```
 Visit test page:
	localhost:3000/test.html