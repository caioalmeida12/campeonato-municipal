interface ZodIssue {
    path: string[];
    message: string;
    code: string;
    validation: string;
}

interface ZodError {
    name: string;
    message: string;
    issues: ZodIssue[];
    stack: string;
}

class ZodError extends Error {
    constructor(message: string, public issues: ZodIssue[]) {
        super(message);
        this.name = "ZodError";
    }
}

export default ZodError;