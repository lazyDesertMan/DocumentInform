import React, {useState} from "react";
import {Document, Page} from "react-pdf";
import { useParams } from "react-router";
import {GetPDF} from "../http/userAPI"

let application;
async function load() {
    try{
        let data = await GetPDF()
        return data;
    } catch(e) {
        console.log(e);
        return null;
    }
}
const PDF = () => {
    load().then(response => {
        application = response;
    })

    return(<DocDotPDF/>)
};

const DocDotPDF = () => {
    const {id} = useParams();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return(
        <div>
            <Document
                file=""
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
};
export default PDF;