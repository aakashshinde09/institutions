import { ColorSchemeScript } from '@mantine/core'
import { APP_META } from '@shared/meta'
import Document, { Head, Html, Main, NextScript } from 'next/document'
// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={APP_META.locale}>
        <Head>
          <ColorSchemeScript defaultColorScheme="auto" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
