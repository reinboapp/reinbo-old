// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    // const initialProps = await Document.getInitialProps(ctx);
    // return { ...initialProps };
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <link rel="stylesheet" type="text/css" href="/static/sanitize.css" />
          <link rel="stylesheet" type="text/css" href="/static/base.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/emoji-mart.css"
          />
          {this.props.styleTags}
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
