defmodule OnlineEditor.Document do
  @moduledoc """
  The text editor document schema. Used for everything in the frontend
  """
  use OnlineEditor.Schema
  import Ecto.Changeset
  alias OnlineEditor.Document
  alias OnlineEditor.Folder

  schema "documents" do
    field(:content, :string, default: "")
    field(:name, :string)
    field(:owner, :string)
    field(:starred, :boolean)
    field(:deleted, :boolean)
    field(:deleted_at, :naive_datetime)
    belongs_to(:folder, Folder)
    timestamps()
  end

  @doc false

  defp transform_folder(%{"folder" => folder_id} = attrs) do
    attrs
    |> Map.drop(["folder"])
    |> Map.put("folder_id", folder_id)
  end

  defp transform_folder(attrs), do: attrs

  def create_changeset(%Document{} = document, attrs) do
    attrs = transform_folder(attrs)

    document
    |> change(%{})
    |> Map.put(:empty_values, [""])
    |> cast(attrs, [:name, :owner, :content, :folder_id])
    |> validate_required([:name, :folder_id])
  end

  def changeset(%Document{} = document, attrs) do
    attrs = transform_folder(attrs)

    document
    |> change(%{})
    |> cast(attrs, [:name, :content, :folder_id])
  end

  def delete_changeset(%Document{} = document) do
    deletion = %{deleted: true, deleted_at: Ecto.DateTime.utc()}

    document
    |> change(deletion)
    |> validate_required([:deleted, :deleted_at])
  end
end
