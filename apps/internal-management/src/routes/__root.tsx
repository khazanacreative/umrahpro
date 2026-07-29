import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <div>
        <h1>Internal Management Platform</h1>
      </div>
    );
  },
});