defmodule OnlineEditorWeb.Models.AuthUser do
  alias Ueberauth.Auth

  def basic_info(%Auth{} = auth) do
    IO.puts("Auth info")
    IO.inspect(auth)
    {:ok,
     %{
       avatar: auth.info.image,
       email: auth.info.email,
       first_name: auth.info.first_name,
       last_name: auth.info.last_name
     }}
  end
end
