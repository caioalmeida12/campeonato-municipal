interface ZodIssue {
    path: string[];
    message: string;
    code: string;
    validation: string;
}

class ZodError extends Error {
    constructor(message: string, public issues: ZodIssue[]) {
        super(message);
        this.name = "ZodError";
    }
}

export default ZodError;