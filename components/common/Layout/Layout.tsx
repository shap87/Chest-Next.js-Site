import Head from "next/head";

// components
import { Header } from "../Header/Header";

interface ILayout {
  children: any
  classname: string
  title: string
  description: string
  noButton?: boolean | undefined
}

export const Layout = ({ classname, children, title, description, noButton }: ILayout) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <Header noButton={noButton} />
      <main className={classname}>
        {children}
      </main>
    </>
  )
}