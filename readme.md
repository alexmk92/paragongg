# ParagonGG 2.0

[![Build Status](https://semaphoreci.com/api/v1/projects/a3268a9b-eca2-44e5-961b-32e8594ad5ee/819627/badge.svg)](https://semaphoreci.com/jamieshepherd/paragongg)

This repository hosts the code for the application layer of ParagonGG, a news, strategy, and stats website for the MOBA title from Epic Games: Paragon.

## Production Stack
- Amazon AWS
    - Elastic Beanstalk
    - RDS cluster for structured data (AuroraDB)
    - EC2 cluster for unstructured data (MongoDB)
- PHP 7.0 running Laravel
- ReactJS *enhanced* front end
- Webpack
- Typekit

## Prerequisites

- PHP >=5.5
- [Laravel Homestead](https://github.com/laravel/homestead)
- [Node / NPM](https://nodejs.org/en/)

## Installation

- Clone [jamieshepherd/paragongg](https://github.com/jamieshepherd/paragongg)
- Add ParagonGG to Homestead.yaml
- Ensure storage/app is writeable
- Run `composer install`
- Run `npm install`

## Development

- General development can all be achieved with `npm run dev` which will run the development webpack service
- This will build all *.scss* in resources/assets/sass to [public/build/css/app.css](public/build/css/app.css)
- This will build all *.js* in resources/assets/js to [public/build/js/app.min.js](public/build/js/app.min.js)

## Contributing

- Fork the main repository and pull request your changes
- General changes should go to the *develop* branch
- New features should be separate branches e.g. *new-cache-system*

## Issues

Feel free to log any issues in the origin/master repository as you see fit.
