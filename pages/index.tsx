import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { CldUploadButton } from "next-cloudinary";

type ConnectionStatus = {
  isConnected: boolean;
};

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect(); // `await client.connect()` will use the default database passed in the MONGODB_URI
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
  };

  export type UploadResult = {
    info: {
      public_id: string;
    };
    event: "success";
  };

  export async function createPaywall(public_id: string, url: string) {
    fetch("/api/post/paywall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id, url }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      }
      ); 
  }

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold text-center">
        LNBITS Gallery Admin
      </h1>
      <div className="flex flex-col place-items-center gap-12">
        <div className="relative flex place-items-center gap-6 before:absolute before:h-[00px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          {" + "}
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] saturate-0 brightness-0 dark:saturate-100 dark:brightness-100"
            src="/mongodb.svg"
            alt="MongoDB Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        {isConnected ? (
         <div> 
          <h2 className="text-lg text-green-500">
            Connected to MongoDB!
          </h2>
          <CldUploadButton    
              uploadPreset="gallery-admin"
              onSuccess={(results)=> {
                console.log("Upload successful", results);
                const public_id = results.info.public_id;
                const url = results.info.url
                createPaywall(public_id, url);
              }}
          />
        </div>
        ) : (
          <h2 className="text-lg text-red-500">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </h2>
        )}
      </div>
    </main>
  );
}
