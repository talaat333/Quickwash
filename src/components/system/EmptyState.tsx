import type { ReactNode } from "react";
import { StateScreen } from "./StateScreen";
import { EmptyIcon } from "./icons";

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <StateScreen icon={<EmptyIcon />} title={title} description={description} action={action} />;
}
