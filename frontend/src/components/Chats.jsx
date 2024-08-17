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
          </List.Item>
        );
      }}
    />
  );
};

export default function Chats() {
  

  const [data, setData] = useState();
  const pingAlert = PingAlert();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await secureAxios.get(api_routes.CHAT_USERS);
        setData(res.data);  
      } catch (error) {
        pingAlert.error("Failed to fetch chat data", 6);
      }
    };

    fetchData();
  }, []);

  


  

  return (
    <>
      <ListShow data={data} />

      

     
    </>
  );
}
