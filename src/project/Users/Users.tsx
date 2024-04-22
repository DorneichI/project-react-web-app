import { useEffect, useState } from "react";
import * as client from "./client";
import { FaRegTrashCan } from "react-icons/fa6";

function Users() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    }

    const deleteUser = async (user: client.User) => {
        try {
          await client.deleteUser(user);
          setUsers(users.filter((u: client.User) => u._id !== user._id));
        } catch (err) {
          console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers(); 
    }, []);

    return(
        <>
            <h3>Users</h3>
            <div className="p-2">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.role === "USER" ? <>User</> : <>ADMIN</>}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Users;