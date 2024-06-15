import logger from "./LoggerUtil";

export class ENV {
    public static BASE_URL: string = process.env.BASE_URL || 'DEFAULT_BASE_URL';
    public static ENVIRONMENT: string = process.env.ENVIRONMENT || 'DEFAULT_ENVIRONMENT';
}
logger.info("Env data is consume");

