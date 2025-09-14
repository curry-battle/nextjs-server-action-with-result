## Next.js の Server -> Clientの処理でResult型を使うときに気をつけたいこと

Next.jsのServer側の処理 ServerComponent内での処理やServerActionを用いると、ServerからClientにデータを渡すことができる。

この際に渡すデータはPlainなオブジェクトである必要があり、メソッドをもたせたりするとサーバ側でのシリアライズ時にエラーになる。  
`Only plain objects can be passed to Client Components from Server Components.`

クラスのインスタンスを渡そうとする場合もエラーになったりプロパティが欠損したりする。

表題の通り「tsでもResult型を使うぞ〜」と気合を入れコードを書き、人もコンパイラも上記の点を見過ごしたまま開発を進めて、最終的に上記のエラーを見て落ち込むことがあるかもしれない。

今回取り上げたいのがResult型に使いがちなclass Errorをextendsしたclassになる。

例えばこういうclassはコメントの通りシリアライズで`code`が欠損する！欠損するだけでエラーにはならない。何かメソッドをもたせればエラーになる。

```ts
export class CustomError extends Error {
  // Seerver → Client でシリアライズされる際に code プロパティは落とされる
  code: number;

  constructor(message: string, code: number = 500) {
    super(message);
    this.name = "CustomError";
    this.code = code;
  }
}
```

ということで今回のようなシーンではこういうエラーオブジェクトを別途用意してResultの中ではそれを使うのがいいんじゃないかなぁ

```ts
export type ActionError = {
  name: string;
  message: string;
  code: number;
};
```

## 補足

React, Next.jsの内部構造のことをまるで理解していないが、Next.jsのリポジトリでERRORのシリアライズに関してDeepwikiに質問した

前段としてどこから呼ばれるのか理解していないが、`renderModel` を起点として `renderModelDestructive` が呼ばれて、その中で `Only plain objects can be passed to Client Components from Server Components.` が発生している。

https://github.com/vercel/next.js/blob/91601608/packages/next/src/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.node.unbundled.development.js#L2338-L2343

https://github.com/vercel/next.js/blob/91601608/packages/next/src/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.node.unbundled.development.js#L2398

Errorのインスタンスは事情が特殊で別途特殊なシリアライズ処理をされる

https://github.com/vercel/next.js/blob/91601608/packages/next/src/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.node.development.js#L2551

https://github.com/vercel/next.js/blob/91601608af4d1da55e4652e8304426d2882cece3/packages/next/src/compiled/react-server-dom-webpack/cjs/react-server-dom-webpack-server.node.development.js#L2759-L2782

ここで明確にcodeが落ちていることがわかる

## Getting Started

```bash
npm i
npm run dev
```
