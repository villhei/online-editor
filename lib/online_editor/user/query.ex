defmodule OnlineEditor.User.Query do
  use OnlineEditor, :query
  alias OnlineEditor.User
  alias Ueberauth.Auth

  def get_by_id(id) do
    Repo.get_by(User, id: id, deleted: false)
  end

  def get_by_email(email) do
    query =
      from(
        u in User,
        where: u.email == ^email,
        select: u
      )

    Repo.one(query)
  end

  def create_from_auth(user) do
    changeset =
      User.changeset(%User{}, %{
        email: user.email,
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name,
        auth_provider: "google"
      })

    Repo.transaction fn ->
      user = Repo.insert!(changeset)

      # Build a comment from the post struct
      root_folder = Ecto.build_assoc(user, :root_folder, name: "Root")

      Repo.insert!(root_folder)
      user
    end
  end
end
