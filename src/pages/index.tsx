import Hero from "@/components/home-page/Hero";
import SEO from "@/components/seo";
import DefaultLayout from "@/layouts/defaultLayout";
import { ReactElement } from "react";

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}
