import { useEffect, useState } from "react";
import Input from "../common/input";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../generated/graphql";

export default function UserForm({ refetch, updatedData }: any) {
  const [userData, setUserData] = useState({ id: "", name: "", email: "" });
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  function handleUserData(event: any) {
    let { name, value } = event.target;

    let currentInput = { [name]: value };

    setUserData((prev) => ({ ...prev, ...currentInput }));
  }
  async function handleSubmit() {
    if (updatedData?.id) {
      await updateUser({
        variables: {
          updateUserId: userData.id,
          name: userData.name,
          email: userData.email,
        },
      });
    } else {
      await createUser({
        variables: { name: userData.name, email: userData.email },
      });
      refetch();
    }

    await setUserData({ id: "", name: "", email: "" });
  }

  useEffect(() => {
    setUserData({
      id: updatedData.id,
      name: updatedData.name,
      email: updatedData.email,
    });
  }, [updatedData]);

  return (
    <>
      <Input
        onChange={handleUserData}
        type="text"
        name="name"
        placeholder="Enter your Name"
        value={userData.name}
      />

      <Input
        onChange={handleUserData}
        type="email"
        name="email"
        placeholder="Enter your Email"
        value={userData.email}
      />

      <button onClick={handleSubmit}>
        {updatedData?.id ? "Update" : "Submit"}
      </button>
    </>
  );
}
