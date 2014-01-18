== README

This is a prototype to create a generic service shell to deliver a single page application. The service layer contains jbuilder templates to manage json requests, handlerbar templates to render page views, and a jquery client library to enable single page functionality.

The for this demo the service mounts a rails engine for basic question and answer functionality.

Things you may want to cover:

= Versions
* Ruby 2.X.X
* Rails 4.X.X

= System dependencies

 Option of sqlite or postgre to run application.
  * If postgres, create root user with no password.

= Configuration
	$ bundle

= Database creation and initialization
	* development & test:
	$ rake db:setup

= Start app
	rails s

= Visit test page
	localhost:3000/test.html