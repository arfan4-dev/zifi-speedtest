import Head from "next/head";
import { primaryFont } from "../lib/fonts";
import { SITE_TITLE } from "@/lib/constants";
import PageOne from "./PageOne";
import NoInternetConnection from "./internet-speed-info/NoInternetConnection";

export default function Home() {


  return (
    <>
      <Head>
        <title>{`${SITE_TITLE}`}</title>
      </Head>
      <main >
        <NoInternetConnection>
          <PageOne className={primaryFont} />
        </NoInternetConnection>

      </main>
    </>
  );
}
