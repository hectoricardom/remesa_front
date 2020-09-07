import Link from 'next/link'
import Head from 'next/head'

const linkStyle = {
  marginRight: 15
}

export default function Header() {
  return (
    <div>
     
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>     
      <Link href="/upload">
        <a style={linkStyle}>Upload</a>
      </Link>
      <Link href="/dashboard">
        <a style={linkStyle}>Dashboard</a>
      </Link>
      <Link href="/">
        <a style={linkStyle}>About</a>
      </Link>
    </div>
  )
}



/*
 <Head>
        <meta charset='utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />
        <title>HRM</title>

        <link rel='manifest' href='public/manifest.json' />
        <link href='public/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='public/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='public/apple-icon.png'></link>
        <meta name='theme-color' content='#317EFB' />
      </Head>
      
*/