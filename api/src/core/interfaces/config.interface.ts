export interface IConfigEmail {
    smtp: {
        host: string;
        port: string;
        auth: {
            user: string;
            pass: string;
        };
    };
    from: string;
}

export interface IConfigJwt {
    secret: string;
    accessExpirationMinutes: string;
    refreshExpirationDays: string;
    resetPasswordExpirationMinutes: string;
    verifyEmailExpirationMinutes: string;
}

export interface IConfigDB {
    host: string;
    database: string;
    username: string;
    password: string;
    port: number;
    ssl: 'require';
    connection: {
        options: string;
    };
}

export interface IAllRoles {
    [key: string]: string[];
}

export interface IConfigOTP {
    attempts: number;
    validTimeMinutes: number;
    blockUntilMinutes: number;
}
