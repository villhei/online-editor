defmodule OnlineEditor.Document do
  @moduledoc """
  The text editor document schema. Used for everything in the frontend
  """
  use OnlineEditor.Schema
  import Ecto.Changeset
  alias OnlineEditor.Document
  alias OnlineEditor.Folder

  schema "documents" do
    field :content, :string, default: ""
    field :name, :string
    field :owner, :string
    field :deleted, :boolean
    field :deleted_at, :naive_datetime
    belongs_to :folder, Folder
    timestamps()
  end

  @doc false
  def changeset(%Document{} = document, attrs) do
    document
    |> change(%{})
    |> Map.put(:empty_values, [""])
    |> cast(attrs, [:name, :owner, :content])
    |> validate_required([:name, :owner])
  end

  def delete_changeset(%Document{} = document) do
    deletion = %{deleted: true, deleted_at: Ecto.DateTime.utc()}
    document
      |> change(deletion)
      |> validate_required([:deleted, :deleted_at])
  end
end
