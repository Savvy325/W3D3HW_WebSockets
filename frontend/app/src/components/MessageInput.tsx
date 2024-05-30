import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { KeyboardEvent } from "react";
import { Socket } from "socket.io-client";

interface SocketProps {
    socket: Socket;
}

const MessageInput = ({ socket }: SocketProps) => {
    const [message, setMessage] = useState<string>("");

    const handleSendMessage = () => {
        const getName = sessionStorage.getItem("username");
        socket.emit("message", {
            getName,
            text: message,
        });
        setMessage("");
    };

    const handleEnterKey = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Container>
            <Form>
                <Form.Group controlId="messageInput">Enter your message:</Form.Group>
                <Form.Control
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => handleEnterKey(event)}
                    autoComplete="off"
                />
            </Form>
            <Button onClick={handleSendMessage}>Send Message</Button>
        </Container>
    );
};
export default MessageInput;