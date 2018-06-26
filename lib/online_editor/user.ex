defmodule OnlineEditor.User do
  use OnlineEditor.Schema
  import Ecto.Changeset

  schema "users" do
    field(:email, :string)
    field(:auth_provider, :string)
    field(:first_name, :string)
    field(:last_name, :string)
    field(:deleted, :boolean)
    field(:avatar, :string)
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :auth_provider, :first_name, :last_name, :avatar])
    |> validate_required([:email, :auth_provider, :first_name, :last_name, :avatar])
    |> unique_constraint(:email)
  end
end
