import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/Providers";
import { Table, Button } from "flowbite-react";
import Swal from "sweetalert2";

export default function Shops() {
  const axiosbaseUrl = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [shops, setShops] = useState([]);

  // fetching all stores
  useEffect(() => {
    axiosbaseUrl
      .get(`/allshops?useremail=${user?.email}`)
      .then((res) => setShops(res.data));
  }, []);

  // send notice to store owner
  const sendNotice = async (email) => {
    const storeOwnerEmail = { email };

    try {
      const sendNoticeInfo = await axiosbaseUrl.post(
        "/sendnotice",
        storeOwnerEmail
      );
      if (sendNoticeInfo.data.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Notice send successfully",
          icon: "success",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `${err.message}`,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Table className="drop-shadow-none">
        <Table.Head>
          <Table.HeadCell>Shop Logo</Table.HeadCell>

          <Table.HeadCell>Shop Name</Table.HeadCell>
          <Table.HeadCell>Product Limit</Table.HeadCell>
          <Table.HeadCell>Shop Description</Table.HeadCell>
          <Table.HeadCell>Send Notice</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y border-none">
          {shops?.map((shop, id) => (
            <Table.Row
              key={id}
              className="bg-white dark:border-gray-700 dark:bg-gray-80"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {<img src={shop?.shoplogo} className="h-12 w-12 rounded" />}
              </Table.Cell>
              <Table.Cell>{shop?.shopname}</Table.Cell>
              <Table.Cell>{shop?.productLimit}</Table.Cell>
              <Table.Cell>{shop?.description}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => sendNotice(shop?.useremail)}>
                  Send Notice
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
