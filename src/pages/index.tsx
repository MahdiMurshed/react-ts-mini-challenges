import { atom, useAtom } from "@/jotai";

const initial = atom(0);

export default function Home() {
  const [count, setCount] = useAtom(initial);
  return (
    <div>
      <div>
        <h1>Page 1</h1>
        <button onClick={() => setCount(count + 1)}>+</button>
        <div>{count}</div>
      </div>
      <AnotherPage />
    </div>
  );
}

function AnotherPage() {
  const [count, setCount] = useAtom(initial);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <div>{count}</div>
    </div>
  );
}
