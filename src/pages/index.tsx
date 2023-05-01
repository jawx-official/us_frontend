import SEO from "@/components/seo";
import DefaultLayout from "@/layouts/defaultLayout";
import { ReactElement } from "react";

export default function Home() {
  return (
    <>
      <SEO />
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi incidunt provident excepturi dolore vitae sunt ex voluptates, suscipit distinctio, tempore libero. Placeat nihil alias ducimus qui, ullam amet corporis sunt.
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
