import React, { useEffect, useState } from 'react';
import { Modal, Avatar, List, Typography, Button, Form, Input, message } from 'antd';
import secureAxios from '../utils/axios/config';
import api_routes from '../utils/router/apiMapper';
import PingAlert from '../utils/alert';

const ListShow = ({ data,showModal }) => {
  

  return (
    <List
      itemLayout="horizontal"
      style={{ margin: '10px', height: '100%' }}
      dataSource={data}
      renderItem={(item) => {
        const initials = item.first_name.charAt(0) + item.last_name.charAt(0);
       

        return (
          <List.Item>
            <Avatar
              style={{
                
                fontWeight: 'bold',
                marginRight: '10px',
              }}
            >
              {initials.toUpperCase()}
            </Avatar>
            <List.Item.Meta
              title={item.first_name}
              description={
                <>
                  <Typography.Text>{item.last_name}</Typography.Text> <br />
        
                </>
              }
            />
            <Button className="cm-btn" onClick={()=>showModal(item.id)}>Request</Button>
          </List.Item>
        );
      }}
    />
  );
};

export default function PubLobby() {
  const pingAlert = PingAlert();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [refreshComp, setRefreshComp] = useState(false);

  const [data, setData] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await secureAxios.get(api_routes.PUBLIC_LOBBY);
        setData(res.data);  // Assuming the response data is in res.data
      } catch (error) {
        pingAlert.error("Failed to fetch lobby data", 6);
      }
    };

    fetchData();
  }, [refreshComp]);

  


  const showModal = (id) => {
    setIsModalOpen(true);
    setSelectedUser(id)
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedUser(null)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    
    values.opt_user = selectedUser;
  
    try {

      const res = await secureAxios.post(api_routes.RAISE_REQUESTS, values);
      pingAlert.success("Interest request sent successfully", 6);
    } catch (error) {
      pingAlert.error("Failed to raise the request", 6);
    }
  
    // Close the modal after submission
    handleOk(); 
    setRefreshComp(true)
  };
  

  return (
    <>
      <ListShow data={data} showModal={showModal}/>

      

      <Modal
        title="Send interest"
        open={isModalOpen}
        onOk={form.submit}  // Submits the form when the modal "OK" button is clicked
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please input something!' }]}
          >
            <Input.TextArea placeholder="Enter something..." />
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
}
