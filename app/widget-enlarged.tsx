import * as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract";
import { Expense } from "./Expense";
import Scrollbars from "react-custom-scrollbars";

interface EnlargedWidgetProps {
  widgetProps: WidgetProps;
}

interface EnlargedWidgetState {
  data: Expense[];
  searchResult: [];
  displayAdd: boolean;
  selectedCity: string;
  searchtextvalue: string;
}

export const EnlargedWidget: React.FC = () => {
  return <div>TODO</div>;
};
