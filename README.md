# OnlineEditor (update TBD)

Dependencies
 * Erlang OTP 20
 * Elixir 1.5.1
 * PostgreSQL 9.5.7
 * NodeJS 7.10.1 or later
 * TypeScript 2.7.2

## Description

This is a text editor for the web. The aim of the editor is to be fast, programmer-friendly text editor for the web with markdown highlight and publish support. The aim of this project is to build a personal text editor service for storing daily files such as, such as shopping lists, food recipes, link collections and similar.

The motivation behind this editor was the destructive writes of Google Keep, which makes it very unusable for situations, where notes need to be shared.

### Frontend stack
* TypeScript
* React (with redux, react-router)
* Semantic UI
* LESS
* WebPack

### Backend stack
* Elixir
* Phoenix Framework

## Running in development

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4040`](http://localhost:4040) from your browser for the raw Phoenix-served app.

Use the webpack-dev-server provided [`localhost:4001`](http://localhost:4001) for live reload. Useful for client-side development.

## Running in production

This app is set up for deployment to [Gigalixir](https://gigalixir.com/). In order to deploy to Gigalixir, you must first set up an Gigalixir account and set up the provided gigalixir git repository as a target.

### Roughly
1. Register a gigalixir app
2. Set up gigalixir as git remote
3. `git push gigalixir master`
4. `gigalixir migrate <app-name>`
5. Profit

## Code style

Run `mix credo` or `mix credo --strict` for code style checks.

### Done / working
* Create, Read, Update endpoints for document with overwrite protection
* Sharing documents as rendered markdowns
* Placeholder client

### Not working, epics
* Collaborative editing (operational transform for backend + client)
* User management
* Websocket connections
* PWA application
* Offline use

### TODO / stackwise

* Optimize the build, less assets take long to compile
* Optimized production build
* PWA manifest generation

## Learn more
  * Elixir website: https://elixir-lang.org/
  * Typescript website: https://www.typescriptlang.org/
  * Phoenix framework website: http://www.phoenixframework.org/
  * React docs: https://reactjs.org/docs/hello-world.html

  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
