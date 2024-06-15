import { FullConfig } from '@playwright/test';
import dotenv from "dotenv";
import logger from './LoggerUtil';

async function GlobalSetup(config: FullConfig) {

    if(process.env.test_env) {
        logger.info("Going to select the environment")
        dotenv.config({
            path: `.env.${process.env.test_env}`,
            override: true
        })
    }
}

export default GlobalSetup;

logger.info('Global environment setup completed.');
