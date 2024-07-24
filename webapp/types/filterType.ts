import UI5Date from "sap/ui/core/date/UI5Date";
import Filter from "sap/ui/model/Filter";

export type Dict<T = any> = { [key: string]: T };

export interface FilterValues {
  search: string;
  endDate: Date | UI5Date;
  startDate: Date | UI5Date;
  DeleteId: string[];
}

export interface Fiter {
  filters: Filter[];
  inputValues: Dict;
}

export interface dataFilter {
  groupName: string,
  fieldName: string,
  fieldData: string | Date | UI5Date | string[]
}
