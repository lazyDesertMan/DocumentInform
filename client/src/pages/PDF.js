import React from "react";
import { Button} from "react-bootstrap";
import {DOCUMENT_ROUTE } from "../utils/consts";
import '../css/style.css';
import { useNavigate, useParams } from "react-router-dom";

const PDF = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    return(
        <>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <iframe src={"http://localhost:1337/api/document/read?docID=" + id} width="100%" height="685em" title="documentDotPDF"></iframe>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Button 
                    variant={"outline-dark"}
                    onClick={() => navigate(DOCUMENT_ROUTE)}
                >
                Ознакомиться
                </Button>
            </div>
        </>
    );
};
export default PDF;