import * as React from "react";
import { Hero, Button, Typography } from "@talentsoft/design-system";

export const NormalWidget = () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <Hero
        title="I am a widget"
        image="https://images.unsplash.com/photo-1452697620382-f6543ead73b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      />
    </>
  );
};
