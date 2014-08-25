# rack.js

Vanilla javascript helpers for any [Rack](http://rack.github.io/) based
application (except for [Ruby on Rails](http://rubyonrails.org), which has
[its own helpers](https://github.com/rails/jquery-ujs/blob/master/src/rails.js)).

## Installation

Download `rack.js` and make it publicly available.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/js/rack.js" type="text/javascript"></script>
  </head>
  <body>
  </body>
</html>
```

## Usage

### data-confirm

You can make any link confirmable by adding a data-confirm attribute to it.

```html
<a href="/hello-world" data-confirm="Are you sure?">Click me!</a>
```

### data-method

You can specify a method to any link by adding a data-method attribute to it.

```html
<a href="/sessions/destroy" data-method="delete">Sign out</a>
```

### And you can use them together!

You can use both data-confirm and data-method attributes on any link!

```html
<a href="/articles/1" data-method="delete" data-confirm="Are you sure?">Destroy</a>
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

See the [LICENSE](https://github.com/patriciomacadden/rack.js/blob/master/LICENSE).
