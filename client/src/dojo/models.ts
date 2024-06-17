import { ContractComponents } from "./generated/contractModels";
import { overridableComponent } from "@dojoengine/recs";
import { Player } from "./game/models/player";

export type ClientModels = ReturnType<typeof models>;

export function models({
  contractModels,
}: {
  contractModels: ContractComponents;
}) {
  return {
    models: {
      ...contractModels,
    },
    classes: {
      Player,
    },
  };
}
