import Head from "next/head";

// components
import { Header } from "../Header/Header";

interface ILayout {
  children: any
  title: string
  description: string
}

export const Layout = ({ children, title, description }: ILayout) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}