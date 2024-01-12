import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// QueryClient and QueryClientProvider from @tanstack/react-query:
// Used for setting up React Query for data fetching and state management.

import "./App.css";
import Demo from "./Demo";

// new QueryClient({...}): This creates a new instance of QueryClient. 
// The object passed to it is used to configure the behavior of this client.
const queryClient = new QueryClient({
    defaultOptions: {
        // queries: This section is specifically for configuring the default behavior of all queries
        // managed by this QueryClient instance.
        queries: {
            refetchOnWindowFocus: false,
            // refetchOnWindowFocus: false: This is a specific setting inside the queries configuration.
            // By default, React Query refetches data for all queries when the browser window regains focus.
            // This can be useful to ensure that the user always sees up-to-date data.
            // However, in some cases, you might want to disable this behavior.
            // Setting refetchOnWindowFocus to false does exactly that.
            // It tells React Query not to automatically refetch data when the window regains focus.
        },
    },
});
function App() {
    //const [count, setCount] = useState(0);
    const [showDemo, setShowDemo] = useState(true);
    return (
        <QueryClientProvider client={queryClient}>
            <button onClick={() => setShowDemo(!showDemo)}>Toggle Demo</button>
            {showDemo && <Demo />}
        </QueryClientProvider>
    );
}

export default App;
