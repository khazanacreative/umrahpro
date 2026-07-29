import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <div>
        <h1>Jamaah & Tim Lapangan Platform</h1>
      </div>
    );
  },
});