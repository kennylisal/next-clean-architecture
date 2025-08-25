import { ErrorDisplay } from "@/components/error/error_display";
import Image from "next/image";
interface Message {
  params: {
    msg?: string;
  };
}
export default async function Page({ params }: Message) {
  const { msg } = await params;
  const message = msg ?? "Not Authorized";
  return (
    <>
      <ErrorDisplay text={message} />
      <div style={{ position: "relative", width: "100%", height: "500px" }}>
        <Image src="/not-authorized.png" alt="Not Authorized" fill priority />
      </div>
    </>
  );
}
