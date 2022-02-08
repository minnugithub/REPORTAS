import React from "react";
import "antd/dist/antd.css";
import { Table, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";



export default function Tabledetails() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] =useState(3);
  const [page,setPage] = useState(1)
  useEffect(() => {
    getUser();
  }, []);


  function getUser() {
    setLoading(true);
    fetch(`http://localhost:3001/tasks/${1971137}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
 

  const columns = [
    {
      key: "1",
      title: "Task Name",
      dataIndex: "taskname",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
         
            <Input
              autoFocus
              placeholder='Type text here'
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type='primary'>
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type='danger'>
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.taskname.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "2",
      title: "Task ID",
      dataIndex: "taskid",
    },
    {
      key: "3",
      title: "Task Description",
      dataIndex: "taskdescription",

    },
    {
      key: "4",
      title: "Status",
      dataIndex: "status",
      
    },
    {
      key: "5",
      title: "view task",

      render: (task) => {
        return (
          <>
            <button>view </button>
          </>
        );
      },
    },
    {
      key: "6",
      title: "Approval",
      dataIndex:"approval"
    },
 
  ];

  return (
   
    <div className='table'>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
            pageSize:pageSize,
            onChange:(page,pageSize)=>{
              setPage(page);
            setPageSize(pageSize)
            }
          }
          }></Table>
    </div>
  );
}
