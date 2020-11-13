import * as React from "react";
import { ThemeProvider } from "@talentsoft/design-system";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract";

export interface ProviderProps extends WidgetProps {}

const WidgetContext = React.createContext<WidgetProps>({
  // @ts-ignore
  myTSHostService: undefined,
  // @ts-ignore
  language: undefined,
  // @ts-ignore
  currentUser: null,
  isMobile: false,
  params: {},
  scope: 0,
});

const Provider: React.FC<ProviderProps> = ({ children, ...widget }) => {
  return (
    <WidgetContext.Provider value={widget}>
      <ThemeProvider>{children}</ThemeProvider>
    </WidgetContext.Provider>
  );
};

export const useWidget = () => React.useContext(WidgetContext);

export const useHost = () => {
  const widget = useWidget();
  return widget.myTSHostService;
};

export default Provider;
