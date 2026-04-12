import { getQuestionsAction } from "@/actions/pharmacist.action";
import PharmacistQuestionsList from "@/components/modules/pharmacist/PharmacistQuestionsList";

export default async function PharmacistQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, any>>;
}) {
  const resolvedParams = await searchParams;
  const data = await getQuestionsAction(resolvedParams);

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Customer Questions
        </h1>
        <p className="text-muted-foreground">
          Answer medical queries from customers regarding listed medicines.
        </p>
      </div>

      <PharmacistQuestionsList
        questions={data?.data?.result || []}
        meta={data?.data?.meta}
      />
    </div>
  );
}
