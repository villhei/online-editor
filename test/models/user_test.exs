defmodule OnlineEditor.UserTest do
  use OnlineEditor.DataCase

  alias OnlineEditor.User

  @valid_attrs %{auth_provider: "some auth_provider", avatar: "some avatar", email: "some email", first_name: "some first_name", last_name: "some last_name"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
