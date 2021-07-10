import express = require('express');
const router = express.Router();

router.post('/api/getFile', async function (req: express.Request, res: express.Response) {
    try {
        const fs = require("fs");
            console.log(`Requested address: ${req.url}`);
            // get the path after the slash
            const filePath = req.url.substr(1);
            // see if there is such a file
            this.fs.access(filePath, this.fs.constants.R_OK, err => {
                // if an error occurs - send the 404 status code
                if (err) {
                    res.statusCode = 404;
                    res.end("Resourse not found!");
                }
                else {
                    this.fs.createReadStream(filePath).pipe(res);
                }
            });
    } catch (e) { console.error(e); }
    res.send(false);
});
export default router;
