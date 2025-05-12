import * as React from "react";
import { Text as RNText } from "react-native";

import { cn } from "@/utils";

type TextRef = React.ComponentRef<typeof RNText>;
type TextProps = React.ComponentProps<typeof RNText>;
const Text = React.forwardRef<
  React.ComponentRef<typeof RNText>,
  React.ComponentProps<typeof RNText>
>(({ className, ...props }, ref) => {
  return (
    <RNText
      className={cn("font-jk-sans-medium", className)}
      ref={ref}
      {...props}
    />
  );
});
Text.displayName = "Text";

export { Text, TextRef, TextProps };
