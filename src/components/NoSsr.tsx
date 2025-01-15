import dynamic from "next/dynamic";

const NoSsrInternal = (props: { children: React.ReactNode }) => (
  <>{props.children}</>
);

export const NoSsr = dynamic(() => Promise.resolve(NoSsrInternal), {
  ssr: false,
});
