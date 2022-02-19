import React from "react";
import { Card, ListGroup, ListGroupItem, CardGroup, Row } from "react-bootstrap";

const Profile = () => {
    return(
        <div>
            <Row>
                <Card style={{ width: '20%', marginLeft: '2%' }}>
                    <Card.Img variant="top" src="https://sun9-70.userapi.com/impg/E1PkYCH6cJASgOo5DabSL7gRIiCA1CRSrgZkcg/LoNpIvQ6A-o.jpg?size=810x1080&quality=96&sign=ee166bb957012bccbcfc75a7eaebfa3b&type=albump" />
                    <Card.Body>
                        <Card.Title>Карточка сотрудника</Card.Title>
                        <Card.Text>
                        Личная информация о статусе в организации.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>ФИО: Тараканов Владислав Дмитриевич</ListGroupItem>
                        <ListGroupItem>Должность: Программист</ListGroupItem>
                        <ListGroupItem>Группа: ДИПРб-41</ListGroupItem>
                    </ListGroup>
                </Card>
                <Card style={{ width: '75%', marginLeft: '1%' }}>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
             </Row>
        </div>
    );
};
export default Profile;