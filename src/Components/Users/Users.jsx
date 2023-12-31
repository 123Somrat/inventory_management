import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/Providers";
import { Button, Table } from "flowbite-react";
import Swal from "sweetalert2";

export default function Users() {
  const axiosbaseUrl = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    axiosbaseUrl
      .get(`/allusers?useremail=${user?.email}`)
      .then((res) => setUsers(res.data));
  }, [status]);

  // send promotional email
  const sendPromotionalEmail = async (email) => {
    const userEmail = { email };
    const adminEmail = user?.email;

    try {
      const emailsendConformation = await axiosbaseUrl.post(
        `/sendemail?adminEmail=${adminEmail}`,
        userEmail
      );

      if (emailsendConformation.data.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Email send successfully",
          icon: "success",
        });
        // setemailSendingStatus(emailsendConformation.data);
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `${err.message}`,
        icon: "error",
      });
    }
  };

  // create Change User status component

  const changeUserStatus = async (email) => {
    const userStatusChanged = await axiosbaseUrl.patch(
      `/changeuserstatus?email=${email}`
    );
    if (userStatusChanged.data.modifiedCount > 0) {
      Swal.fire({
        title: "Success",
        text: "User Status Changed",
        icon: "success",
      });

      setStatus(true);
    } else {
      Swal.fire({
        title: "Error",
        text: "Something is wrong",
        icon: "Error",
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="drop-shadow-none invisible md:visible">
        <Table.Head>
          <Table.HeadCell>User Name</Table.HeadCell>

          <Table.HeadCell>User Email</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>User Status</Table.HeadCell>
          <Table.HeadCell>Send Promotional Email</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y border-none">
          {users?.map((user, id) => (
            <Table.Row
              key={id}
              className="bg-white dark:border-gray-700 dark:bg-gray-80"
            >
              <Table.Cell>{user?.userName}</Table.Cell>
              <Table.Cell>{user?.email}</Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {user?.createdAt}
              </Table.Cell>
              <Table.Cell>
                <Table.Cell>{user?.role ? user.role : "null"}</Table.Cell>
              </Table.Cell>
              <Table.Cell>
                {user?.status === "pending" ? (
                  <>
                    <p className="text-red-500 text-center m-1">
                      {user?.status}
                    </p>
                    <Button
                      className="whitespace-nowrap"
                      onClick={() => changeUserStatus(user?.email)}
                    >
                      Accept request
                    </Button>
                  </>
                ) : (
                  user?.status
                )}
              </Table.Cell>
              <Table.Cell>
                <p className="font-medium text-red-600 hover:underline dark:text-cyan-500">
                  <Button
                    onClick={() => sendPromotionalEmail(user?.email)}
                    className="whitespace-nowrap"
                  >
                    Send Email
                  </Button>
                </p>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
