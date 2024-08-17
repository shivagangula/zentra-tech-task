import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Button, List, Typography, Empty } from "antd";
import secureAxios from "../utils/axios/config";
import api_routes from "../utils/router/apiMapper";
import PingAlert from "../utils/alert";

export default function IntReq() {
  const pingAlert = PingAlert();
  const [data, setData] = useState([]);
  const [refreshComp, setRefreshComp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await secureAxios.get(api_routes.REQUESTS);
        setData(res.data);
      } catch (error) {
        pingAlert.success("Failed to fetch requests data", 6);
      }
    };

    fetchData();
  }, [refreshComp]);

  const updateStatus = useCallback(async (status, userId) => {
    try {
      const res = await secureAxios.post(api_routes.UPDATE_REQUEST, {
        status,
        raised_user_id: userId,
      });

      if (status===1){
        pingAlert.success("Request accepted succussfully", 6);
      }else{
        pingAlert.success("Request rejected succussfully", 6);
      }
      
    } catch (error) {
      pingAlert.error("Failed to update request status", 6);
    }
    setRefreshComp(true)
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <List
          itemLayout="horizontal"
          style={{ margin: "10px" }}
          dataSource={data}
          renderItem={(item) => {
            const initials = (
              item?.user?.first_name?.charAt(0) || "" +
              item?.user?.last_name?.charAt(0) || ""
            ).toUpperCase();

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar style={{ fontWeight: "bold" }}>{initials}</Avatar>}
                  title={item?.user?.first_name}
                  description={
                    <>
                      <Typography.Text>{item.message}</Typography.Text>
                      <br />
                      <Button
                        onClick={() => updateStatus(1, item?.user?.id)}
                        className="cm-btn"
                        style={{ marginRight: "5px" }}
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={() => updateStatus(2, item?.user?.id)}
                        className="cm-btn-primary"
                      >
                        Accept
                      </Button>
                    </>
                  }
                />
              </List.Item>
            );
          }}
        />
      ) : (
        <Empty />
      )}
    </>
  );
}
