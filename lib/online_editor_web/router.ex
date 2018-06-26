defmodule OnlineEditorWeb.Router do
  use OnlineEditorWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :api_auth do
    plug(:accepts, ["json"])

    plug(
      Guardian.Plug.Pipeline,
      module: OnlineEditor.Guardian,
      error_handler: OnlineEditorWeb.AuthErrorHandler
    )

    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.EnsureAuthenticated)
    plug(Guardian.Plug.LoadResource)
  end

  # Other scopes may use custom stacks.
  scope "/api", OnlineEditorWeb do
    pipe_through(:api_auth)

    resources("/documents", DocumentController)
    resources("/folders", FolderController)
  end

  scope "/api/auth", OnlineEditorWeb do
    pipe_through(:api)
    get("/:provider", AuthController, :request)
    get("/:provider/callback", AuthController, :callback)
    post("/:provider/callback", AuthController, :callback)
    delete("/", AuthController, :delete)
  end

  scope "/", OnlineEditorWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/*path", PageController, :index)
  end
end
