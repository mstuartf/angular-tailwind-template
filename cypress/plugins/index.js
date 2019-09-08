
const gmail = require('../gmail/gmail-client');

const wp = require('@cypress/webpack-preprocessor');
module.exports = (on) => {
    const options = {
        webpackOptions: {
            resolve: {
                extensions: [".ts", ".tsx", ".js"]
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader",
                        options: {transpileOnly: true}
                    }
                ]
            }
        },
    };
    on('file:preprocessor', wp(options));
    on("task", {
        "check-test-email": (args) => {
            return gmail.checkEmailReceived(args.options.recipient, 4, 5);
        }
    });
};


