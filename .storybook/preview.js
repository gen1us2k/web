import withGlobalDeps from "./decorators/withGlobalDeps";
import withLayout from "./decorators/withLayout";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  decorators: [
    withGlobalDeps,
    withLayout
  ],
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
}
