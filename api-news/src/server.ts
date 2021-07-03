import app from './app';
import logger from './utils/logger';

app.listen(app.get('port'), () => {
    logger.info(`Server running and Listening port ${app.get('port')}`);
});

