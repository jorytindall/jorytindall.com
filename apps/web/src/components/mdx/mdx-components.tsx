import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // h1: (props) => <h1 style={{ color: "tomato" }} {...props} />,
  };
}