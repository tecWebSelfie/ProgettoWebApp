import { useRouter } from "next/router";

export default function Notify({ params }: { params: { name: string } }) {
  const a = useRouter();
  return (
    <div>
      <p>{"you've searched for " + params.name}</p>
    </div>
  );
}
