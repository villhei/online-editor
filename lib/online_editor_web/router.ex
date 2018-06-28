defmodule OnlineEditorWeb.Router do
  use OnlineEditorWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:put_secure_browser_headers)
  end

  pipeline :auth do
    plug(:accepts, ["json"])
  end

  pipeline :authorized do
    plug(:accepts, ["json"])

    plug(
      Guardian.Plug.Pipeline,
      module: OnlineEditor.Guardian,
      error_handler: OnlineEditorWeb.AuthErrorHandler
    )

    plug(Guardian.Plug.VerifyCookie)
    plug(Guardian.Plug.LoadResource)
  end

  # Other scopes may use custom stacks.
  scope "/api", OnlineEditorWeb do
    pipe_through(:authorized)

    resources("/documents", DocumentController)
    resources("/folders", FolderController)
    get("/users/current", UserController, :current)
  end

  scope "/api/auth", OnlineEditorWeb do
    pipe_through(:auth)
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
