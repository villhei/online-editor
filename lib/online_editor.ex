defmodule OnlineEditor do
  @moduledoc """
  OnlineEditor keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """
  defmacro __using__(:query) do
    quote do
      import Ecto.Query
      alias OnlineEditor.Repo

      def do_delete(struct_name, id) when is_atom(struct_name) do
        with %struct_name{} = entity <- get_by_id(id),
             changeset <- struct_name.delete_changeset(entity),
             {:ok, entity} <- Repo.update(changeset) do
          {:ok, entity}
        else
          error -> error
        end
      end
    end
  end
end
