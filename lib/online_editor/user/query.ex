defmodule OnlineEditor.User.Query do
  use OnlineEditor, :query
  alias OnlineEditor.User

  def get_by_id(id) do
    Repo.get_by(User, id: id, deleted: false)
  end

  def get_by_email(email) do
    IO.puts("Querying")
    IO.inspect(email)
    query =
      from(
        u in User,
        where: u.email == ^email,
        select: u
      )

    Repo.one(query)
  end
end
