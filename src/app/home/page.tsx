import { createClient } from "@/utils/supabase/supabase.server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
