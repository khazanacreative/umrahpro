import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <div>
        <h1>Agen & Marketing Platform</h1>
      </div>
    );
  },
});