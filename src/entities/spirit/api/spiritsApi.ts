import { useQuery } from "@tanstack/react-query";
import { spiritsListSchema } from "@/shared/models";
import type { SpiritsList } from "@/entities/spirit/model";
import { SPIRITS_QUERY_KEY } from "./queryKeys";

async function fetchSpiritsList(): Promise<SpiritsList> {
  const response = await fetch("/api/spirits");

  if (!response.ok) {
    throw new Error(`Failed to fetch spirits: ${response.statusText}`);
  }

  const data = await response.json();
  const validatedData = spiritsListSchema.parse(data);

  return validatedData;
}

export function useSpiritsList() {
  return useQuery({
    queryKey: SPIRITS_QUERY_KEY,
    queryFn: fetchSpiritsList,
  });
}

export function useSpiritById(id: string | undefined) {
  const query = useSpiritsList();

  const spirit = id ? query.data?.find((s) => s.id === id) : undefined;

  return {
    ...query,
    spirit,
  };
}
