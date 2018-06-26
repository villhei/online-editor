# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :online_editor, ecto_repos: [OnlineEditor.Repo]

# Configures the endpoint
config :online_editor, OnlineEditorWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "DxkKyQ7dxHGhal9fDYEyC/4f26vcH1UX6giw0TEqns4iZA4nwQYFL9JAG06iE1uQ",
  render_errors: [view: OnlineEditorWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: OnlineEditor.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Ueberauth Config for oauth
config :ueberauth, Ueberauth,
  base_path: "/api/auth",
  providers: [
    google: {Ueberauth.Strategy.Google, []},
    identity:
      {Ueberauth.Strategy.Identity,
       [
         callback_methods: ["POST"],
         uid_field: :username,
         nickname_field: :username
       ]}
  ]

# Ueberauth Strategy Config for Google oauth
config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: System.get_env("GOOGLE_OAUTH_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_OAUTH_CLIENT_SECRET"),
  redirect_uri: System.get_env("GOOGLE_OAUTH_REDIRECT_URI") || "http://localhost:4001/api/auth/callback"

# Guardian configuration
config :online_editor, OnlineEditor.Guardian,
  # optional
  allowed_algos: ["HS512"],
  # optional
  verify_module: Guardian.JWT,
  issuer: "OnlineEditor",
  ttl: {30, :days},
  allowed_drift: 2000,
  # optional
  verify_issuer: true,
  secret_key:
    System.get_env("GUARDIAN_SECRET") ||
      "2M9XQ8TIFNodj00JtrBMujGUckr9oG50yUBkHsUIalAG/VRcbXn7JXL/MwY7Lxn4",
  serializer: SocialAppApi.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
