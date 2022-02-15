interface CostObject {
  id: string;
  name: string;
  initial: CostObjectEntry;
  realtor: CostObjectEntry;
  attorney: CostObjectEntry;
  tax: CostObjectEntry;
  extras: CostObjectEntry;
  total: CostObjectEntry;
}


interface CostObjectEntry {
  breakdown?: string;
  title: string;
  value: number;
}
