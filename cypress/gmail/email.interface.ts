export interface GmailEmail {
    to: string;
    from: string;
    subject: string;
    body: {
        html: string;
    };
}
