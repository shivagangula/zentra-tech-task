import { Row, Col, Typography, Segmented, Empty } from "antd";
import Chats from "../components/Chats";
import PubLobby from "../components/PubLobby";
import IntReq from "../components/IntReq";
import React,{useState} from "react";



export default function Home() {
  const themeColor = "#450391";

  const [segmentView,setSegmentView] = useState("Public Lobby")
  return (
    <>
      <Row justify={"center"} style={{ background: "white",marginBottom:'20px',boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
        <Col style={{ padding: "6px" }} md={20}>
          <Typography.Title level={5} style={{fontSize:'8px'}}>
            Zentratech <br />
            <b
              style={{
                color: themeColor,
                fontSize:'20px'
              }}
            >
              ChatMe
            </b>
          </Typography.Title>
          
        </Col>

      </Row>
      <Row justify={"center"}>
        <Col md={20}>
          <div style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", height:'85vh',background: "white"}}>
     <Row>
        <Col md={8}>
        <Segmented
    options={['Public Lobby',"Chatting","Requests"]}
    size="large"
    style={{border:'0.1px solid lightgray', margin:'5px', width:'97%'}}
    onChange={(value) => {
        setSegmentView(value); // string
    }}
  />

 <div style={{height:'65vh'}}>
 {segmentView === "Public Lobby" && <PubLobby/>}
  {segmentView === "Chatting" && <Chats/>}
  {segmentView === "Requests" && <IntReq/>}
 </div>



        </Col>
        <Col md={16}>
        <div style={{
  borderLeft: '0.1px solid lightgray',
  width: '100%',
  height: '100%',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <Empty />
</div>
        </Col>
     </Row>

          </div>
        </Col>
      </Row>
    </>
  );
}
