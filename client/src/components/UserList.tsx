import { useDeleteUserMutation } from "../generated/graphql";

export default function UserList({ data, refetch, getUpdateUserData }: any) {
  const [deleteUser] = useDeleteUserMutation();

  async function deleteUserFn(id: string) {
    await deleteUser({ variables: { deleteUserId: id } });
    refetch();
  }
  return (
    <>
      {data?.users?.map((user: { id: string; email: string; name: string }) => (
        <div className="user-card" key={user?.id}>
          <h3>
            {user.name}'s email is {user.email}
          </h3>

          <button className="delete-btn" onClick={() => deleteUserFn(user?.id)}>
            Delete
          </button>

          <button
            className="delete-btn"
            onClick={() => getUpdateUserData(user)}
          >
            Update
          </button>
        </div>
      ))}
    </>
  );
}
