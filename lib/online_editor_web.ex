defmodule OnlineEditorWeb do
  @moduledoc """
  The entrypoint for defining your web interface, such
  as controllers, views, channels and so on.

  This can be used in your application as:

      use OnlineEditorWeb, :controller
      use OnlineEditorWeb, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below. Instead, define any helper function in modules
  and import those modules here.
  """

  def controller do
    quote do
      use Phoenix.Controller, namespace: OnlineEditorWeb
      import Plug.Conn
      import OnlineEditorWeb.Router.Helpers
      import OnlineEditorWeb.Gettext
      alias OnlineEditorWeb.ErrorView

      defp handle_access_error(conn, cause) do
        case cause do
          {:error, _} -> respond_with_error(conn, 400, "400.json")
          nil -> respond_with_error(conn, 404, "404.json")
          _ -> respond_with_error(conn, 500, "500.json")
        end
      end

      defp respond_with_error(conn, error_code, error_view, error_message \\ []) do
        conn
        |> put_status(error_code)
        |> render(ErrorView, error_view, error_message)
      end
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/online_editor_web/templates",
                        namespace: OnlineEditorWeb

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import OnlineEditorWeb.Router.Helpers
      import OnlineEditorWeb.ErrorHelpers
      import OnlineEditorWeb.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import OnlineEditorWeb.Gettext
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
