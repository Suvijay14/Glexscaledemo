import { notFound } from "next/navigation";
import { getPartnerById } from "@/data/partners";
import { PartnerDetailClient } from "@/components/PartnerDetailClient";

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function DemoPartnerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const partner = getPartnerById(params.id);
  if (!partner) notFound();

  return (
    <PartnerDetailClient
      partner={partner}
      directoryHref="/app/directory"
      gcsSectionId="gcs"
    />
  );
}
