# OnlineEditor (working name)

Dependencies
 * Erlang OTP 20
 * Elixir 1.5.1
 * PostgreSQL 9.5.7
 * NodeJS 7.10.1 or later
 * TypeScript 2.3.1

## Description

### Frontend stack
* TypeScript
* React
* Semantic UI
* LESS
* WebPack

### Backend stack
* Elixir
* Phoenix Framework

### TODO / stackwise

* Set up Webpack Hot Module Reload
* Optimize the build, less assets take long to compile
* Setup webpack-phoenix signals if needed
* Optimized roduction build
* PWA manifest generation

## Running in development

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4040`](http://localhost:4040) from your browser.

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
