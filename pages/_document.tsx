import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
       <Head>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <body className='bg-white text-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
