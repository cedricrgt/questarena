import ChallengeDetailPage from "./ChallengeDetailClient";

// Thin server component wrapper for dynamic route
// All logic is handled client-side in ChallengeDetailClient
export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChallengeDetailPage challengeId={id} />;
}
