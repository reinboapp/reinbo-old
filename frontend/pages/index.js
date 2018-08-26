import App from "../components/App";
import Header from "../components/Header";
import Submit from "../components/Submit";
import PostList from "../components/PostList";

import Link from "next/link";

export default () => (
  <App>
    <Header />
    <ul>
      <li>
        <Link href="/blog?id=first" as="/blog/first">
          <a>My first blog post</a>
        </Link>
      </li>
      <li>
        <Link href="/blog?id=second" as="/blog/second">
          <a>My second blog post</a>
        </Link>
      </li>
      <li>
        <Link href="/blog?id=last" as="/blog/last">
          <a>My last blog post</a>
        </Link>
      </li>
    </ul>
  </App>
);
