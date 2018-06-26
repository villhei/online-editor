defmodule OnlineEditorWeb.UserView do
  use OnlineEditorWeb, :view

  def render("show.json", %{user: user}) do
    %{
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      avatar: user.avatar
    }
  end
end
