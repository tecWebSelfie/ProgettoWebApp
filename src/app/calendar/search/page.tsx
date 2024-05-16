interface Reqres {
  data: { email: string };
}

async function foo(): Promise<Reqres> {
  return (
    await fetch("https://reqres.in/api/users/2")
  ).json() as Promise<Reqres>;
}

async function delay(func: () => Promise<Reqres>): Promise<Reqres> {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(foo()), 3000)
  );
}

export default async function SearchBar() {
  const data = await delay(foo);
  return (
    <>
      <input type="email" placeholder="write down your email" />{" "}
      <p>I guess your email is {data.data.email}</p>
    </>
  );
}
