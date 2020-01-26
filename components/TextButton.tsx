import "./TextButton.css";
import React from "react";
import { stripEmpty } from "../utils/string";
import { event } from "../utils/gtag";

export interface TextButtonProps {
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?(event: Event): void;
  href?: string;
  rel?: "noopener noreferrer";
  target?: "_blank";
}

export default React.forwardRef<HTMLAnchorElement, TextButtonProps>(
  function TextButton(
    { className, external, onClick, href, ...rest }: TextButtonProps,
    ref: React.Ref<HTMLAnchorElement>
  ): React.ReactElement {
    return (
      <a
        className={`TextButton ${stripEmpty(className)}`}
        href={href}
        ref={ref}
        onClick={onClick}
        {...(!onClick &&
          href &&
          external && {
            target: "_blank",
            rel: "noopener noreferrer",
            onClick: (): void => {
              event("Click Link", {
                event_category: "External Links",
                event_label: href
              });
            }
          })}
        {...rest}
      />
    );
  }
);