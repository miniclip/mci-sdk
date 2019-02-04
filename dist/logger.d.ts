export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug"
}
export interface LoggingFunc {
    (level: LogLevel, message: string): void;
}
export interface Logger {
    debug(...msg: any[]): void;
    info(...msg: any[]): void;
    warn(...msg: any[]): void;
    error(...msg: any[]): void;
    setLevel(level: LogLevel): void;
}
export declare function getLogger(name: string): Logger;
export declare function loggerFromLoggingFunc(name: string, loggingFunc: LoggingFunc): Logger;
