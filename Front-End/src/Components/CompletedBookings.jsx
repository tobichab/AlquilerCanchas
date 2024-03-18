import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config";

const CompletedBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get("/user/historialCanchas", {
        params: {
          token: localStorage.getItem("jwt"),
        },
      });
      setBookings(result.data);
    } catch (e) {
      console.log(e);
      setBookings([]);
    }
  };

  const columns = [
    {
      title: "Cancha",
      key: "nombreCancha",
      dataIndex: "nombreCancha",
    },
    {
      title: "Usuario",
      key: "nombreUser",
      dataIndex: "nombreUser",
    },

    {
      title: "Horario",
      key: "fecha",
      dataIndex: "fecha",
    },
    {
      title: "Estado",
      key: "Estado",
      render: (_, record) => {
        return record.completado ? <>Completado</> : <>En Curso</>;
      },
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => {
        const handleDelete = async (id) => {
          try {
            const response = await axiosInstance.delete(
              `/all/deleteturno/${id}`
            );
            console.log("Response:", response.data);
            fetchData();
          } catch (e) {
            console.log(e);
          }
        };

        return (
          <Space size="middle">
            <Button onClick={() => handleDelete(record.id)}>Eliminar</Button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table
        className="tableRol"
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={bookings}
      />
    </>
  );
};

export default CompletedBookings;
