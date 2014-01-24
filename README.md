# Questions and Answers

Questions and Answers is an example implementation of the Questionable rails engine which supports a single-page application (SPA). The SPA functionality is managed through handlebar templates
and a custom client library. The intent is Questions and Anwsers can be implemented on any webpage via a single div and referrence to the client js and css. Making Questions and Answers technology agnostic.

* See Questionable repo for more detail.
https://github.com/brooksjbr/questionable

### Versions:
* Ruby 2.0.0
* Rails 4.0.0

### System dependencies:
	This project is configured to use Postgres.
 
### Configuration:
```shell
	$ bundle
```

### Database creation and initialization
```shell
	$ rake db:setup
```

### Start app
```shell
	rails s
```
 Visit test page: (default routes is slash)
	localhost:3000/

### Local dev with Questionable rails engine

To setup the Questionable in you local dev environment follow these steps:
```shell
	$ git clone https://github.com/brooksjbr/questionable
	$ cd /to/project/vendor
	$ mkdir engines
	$ cd engines
	$ ln -s /full/path/to/questionable/project .
```

In the Gemfile comment out:
# Question and Answer Engine Gem
#gem 'questionable', '~> 0.0.3', git: "git://github.com/brooksjbr/questionable"

Add this line.
# To run engine from vendor off local checkout symlink to engine and replace git path with local path, bundle
gem 'questionable', path: "vendor/engines/questionable"

```shell
	$ bundle
```

### Future Features
This is a prototype to explore some of the possiblities of a SPA. To develop this proof of concept into something production worthy here are some of the features it would likely need.
* Authentication
* Topic Categories
* Pagination
* SEO tracking SPA