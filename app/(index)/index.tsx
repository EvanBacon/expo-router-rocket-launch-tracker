import IndexDom from "@/components/index-dom";

export default function HomeScreen() {
  return (
    <IndexDom
      dom={{
        pullToRefreshEnabled: true,
      }}
    />
  );
}
