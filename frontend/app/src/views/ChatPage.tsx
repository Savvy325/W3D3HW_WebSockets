import { useState } from "react";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { io } from "socket.io-client";
import MessageInput from "../components/MessageInput";
import ChatBody from "../components/ChatBody";

const socket = io("http://127.0.0.1:5000", {
    autoConnect: false,
});

const ChatPage = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const getName = sessionStorage.getItem("username");

    const handleConnect = () => {
        socket.connect();
        setIsConnected(true);
    };

    const handleDisconnect = () => {
        socket.disconnect();
        setIsConnected(false);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h1 className="text-center mb-4">Chat Application</h1>
                    <Alert variant={isConnected ? "success" : "danger"}>
                        {isConnected ? "Connected to Flask Server" : "Disconnected from Flask Server"}
                    </Alert>
                    {isConnected ? (
                        <>
                            <ChatBody socket={socket} name={getName} />
                            <MessageInput socket={socket} />
                            <Button variant="danger" onClick={handleDisconnect} className="mt-3">
                                Disconnect from Server
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" onClick={handleConnect} className="mt-3">
                            Connect to Server
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ChatPage;