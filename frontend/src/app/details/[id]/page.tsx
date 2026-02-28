"use client";

import { useParams } from "next/navigation";
import ChallengeDetailPage from "./ChallengeDetailClient";

export default function DetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) return null;

  return <ChallengeDetailPage challengeId={id} />;
}
