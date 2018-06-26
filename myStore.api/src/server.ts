import app from './app';
import { Logger } from './core/index';
const port: string = process.env.port;

process.on("uncaughtException", function handleError(error: any): void {
    Logger.logger.log(`${error} uncaughtException`);
});

app.listen(port, (err) => {
    if (err)
        return console.log(`Unable to start server - ${err}`);
    else
        return console.log(`server is listening on ${port}`);
}); 