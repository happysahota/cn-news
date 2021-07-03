import { Request, Response, NextFunction } from 'express';
import NewsAPI from 'ts-newsapi';
import { NEWS_API, DEFAULT_REGION } from '../utils/secrets';
import logger from '../utils/logger';

// Global: reuse later
const newsApi = new NewsAPI(NEWS_API);

export const fetchNews = async (req: Request, res: Response, next: NextFunction) => {

    // this way easy to scale in future so that we can have list of regions to support.
    const newsRegion = req.body.region === DEFAULT_REGION ? req.body.region : DEFAULT_REGION;
    const newsFilter = req.body.filter;

    newsApi.getTopHeadlines({
        country: newsRegion,
        q: newsFilter,
        pageSize: 20,
        page: 1,
    }).then(
        data => {
            if (data.status === "ok") {
                res.status(200).send(data)
            } else {
                logger.error(data.error)
                res.status(503).send();
            }
        },
        err => {
            logger.error(err)
            res.status(503).send();
        }
    );
};

