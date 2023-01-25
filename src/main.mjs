import express from "express";
import { apiRouter } from "./api/router-api.mjs";
import swaggerui from 'swagger-ui-express';
import swagDocs from '../swagger.json' assert { type: 'json' };

const port = 3000;

const app = express();

app.use('/docs', swaggerui.serve, swaggerui.setup(swagDocs));
apiRouter.use('/api/v1', apiRouter);

app.use('/api/v1', apiRouter);


app.listen(port, () => {
console.clear();
console.log(`server running at http://localhost:${port}`);

});