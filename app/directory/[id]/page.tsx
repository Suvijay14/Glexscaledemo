import { redirect } from "next/navigation";

export default function DirectoryIdRedirectPage({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/demo/directory/${params.id}`);
}
