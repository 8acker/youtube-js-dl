Angular Gravatar Image
============================
An AngularJS directive to show a Gravatar image

[![Build Status](https://travis-ci.org/deerawan/angular-gravatar-image.svg?branch=master)](https://travis-ci.org/deerawan/angular-gravatar-image)

## Install via NPM
```
npm install angular-gravatar-image --save
```

## Usage
Include the main file
```
<script src="../angular-gravatar-image.min.js"></script>
```
Specify in html
```
<gravatar-image email="deerawan@gmail.com"></gravatar-image>
```

## Options

Available Options

- **email**: Gravatar email
- **size**: determine image size
- **default**: default image when an email address has no matching Gravatar image
- **forcedefault**: force default image to always load
- **rating**: image rating to determine if an image is appropriate for a certain audience
- **ssl**: serve Gravatar via SSL

More detail explanation about Gravatar options please [click here](http://en.gravatar.com/site/implement/images/)

Example syntax using all options

```
<gravatar-image email="deerawan@gmail.com" size="200" default="404" forcedefault="y" rating="pg" ssl="true"></gravatar-image>
```

## License
[MIT License](http://opensource.org/licenses/MIT)