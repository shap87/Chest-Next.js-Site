import Head from "next/head";

// components
import { Header } from "../Header/Header";

interface ILayout {
  children: any
  title: string
  description: string
  noButton?: boolean | undefined
}

export const Layout = ({ children, title, description, noButton }: ILayout) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <Header noButton={noButton} />
      <main>
        {children}
      </main>
    </>
  )
}