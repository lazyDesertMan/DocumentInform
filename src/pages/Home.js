import React from "react";
import { Card, Carousel } from "react-bootstrap";
import '../css/style.css';

const Home = () => {
    return(
        <>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Card style={{ width: '40rem', marginTop: '1%'}}>
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center' }}>АО "Аэропорт Астрахань"</Card.Title>
                        <Card.Text>
                        Международный аэропорт А́страхань имени Б. М. Кустодиева — аэропорт федерального значения, 
                        расположенный на южной окраине города Астрахани в 8 км южнее центра города. 
                        Официальное название аэропорта — «Астрахань».
                        </Card.Text>
                        <Card.Link style={{ marginLeft: '45%'}} href="https://аэропортастрахань.рф">Перейти</Card.Link>
                    </Card.Body>
                </Card>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Carousel fade style={{ width: '50%', marginTop: '1%'}}>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://аэропортастрахань.рф/upload/mest.JPG"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Главный вход</h3>
                        <p>Аэропорт расположен в 8 км от центра Астрахани — административного центра Астраханской области.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://аэропортастрахань.рф/upload/medialibrary/2fa/%D0%AE%D1%80%D1%87%D0%B5%D0%BD%D0%BA%D0%BE_%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%20(129).JPG"
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                        <h3>Аэропорт Астрахань</h3>
                        <p>Ведущее системообразующее предприятие авиатранспортного комплекса Астраханской области.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://аэропортастрахань.рф/upload/medialibrary/364/2021_06_04.jpeg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Авиатранспорт</h3>
                        <p>Международный аэропорт Астрахань является ведущим системообразующим предприятием авиатранспортного комплекса Астраханской области.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    );
};
export default Home;