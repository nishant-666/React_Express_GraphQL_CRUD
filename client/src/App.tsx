import { useState } from "react";
import "./App.css";

import UserForm from "./components/UserForm.tsx";
import UserList from "./components/UserList.tsx";
import { useGetUsersQuery } from "./generated/graphql.tsx";

function App() {
  const { data, refetch } = useGetUsersQuery();
  const [updatedData, setUpdatedData] = useState({});

  async function getUpdateUserData(data: any) {
    setUpdatedData({ name: data.name, email: data.email, id: data.id });
  }
  return (
    <>
      <h1>CRUD Operation</h1>

      <UserForm refetch={refetch} updatedData={updatedData} />

      <UserList
        getUpdateUserData={getUpdateUserData}
        data={data}
        refetch={refetch}
      />
    </>
  );
}

export default App;
