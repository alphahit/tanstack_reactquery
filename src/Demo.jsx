import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// useMutation, useQuery, useQueryClient: Hooks provided by React Query
// for handling mutations, queries, and interacting with the query client respectively.
import { addTodo, fetchTodos } from "./api";
import TodoCard from "./components/TodoCard";
function Demo() {
    const queryClient = useQueryClient();
    //queryClient: An instance of the query client, used for interacting with React Query's cache.
    const [title, setTitle] = useState("");
    const [search, setSearch] = useState("");

    //    const query = useQuery({
    //     queryFn : ()=> fetchTodos(),
    //     queryKey:["todos"],
    //    })

    const { data: todos, isLoading } = useQuery({
        queryFn: () => fetchTodos(search),
        queryKey: ["todos", { search }],
        staleTime: Infinity,
        cacheTime: 0,
    });
    // useQuery: It's used to fetch todo items.
    // queryFn: A function that fetches todo items. It's calling fetchTodos(search),
    // which suggests it fetches todos based on the search string.
    // queryKey: An array that uniquely identifies the query.
    // It's used by React Query to cache and manage the query.
    // staleTime and cacheTime: Configuration for caching.
    // Here, staleTime: Infinity means the fetched data won't become stale,
    // and cacheTime: 0 means cached data is not kept after it becomes inactive.

    const { mutateAsync: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
        },
    });
    //     React Query for Mutations

    // useMutation: It's used for adding a new todo item.
    // mutationFn: The function that performs the mutation. Here, it's addTodo.
    // onSuccess: A callback that's called when the mutation is successful.
    // It invalidates the 'todos' query, causing it to refetch and update with the new data.

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <button
                    onClick={async () => {
                        try {
                            await addTodoMutation({ title });
                            setTitle("");
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    Add Todo
                </button>
            </div>

            {todos?.map((todo) => {
                return <TodoCard key={todo.id} todo={todo} />;
            })}
        </div>
    );
}

export default Demo;
