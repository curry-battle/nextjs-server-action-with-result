"use client";

import { getDog } from "@/actions/dog";
import type { Dog } from "@/app/types/dog";
import type { ActionError, CustomError } from "@/app/types/errors";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [dog, setDog] = useState<Dog | undefined>(undefined);
  const [err, setErr] = useState<ActionError | CustomError | undefined>(
    undefined,
  );

  const handleClick = async (dogId: number) => {
    const result = await getDog(dogId);

    if (result.err) {
      setDog(undefined);
      setErr(result.error);
      return;
    }

    setDog(result.value);
    setErr(undefined);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Server Action Demo</h1>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <button type="button" onClick={() => handleClick(1)}>
            get No.1
          </button>
          <button type="button" onClick={() => handleClick(2)}>
            get No.2
          </button>
          <button type="button" onClick={() => handleClick(3)}>
            get No.3
          </button>
          <button type="button" onClick={() => handleClick(4)}>
            get No.4
          </button>
          <button type="button" onClick={() => handleClick(666)}>
            get No.666
          </button>
          <button type="button" onClick={() => handleClick(999)}>
            get Not Found
          </button>
        </div>

        {dog && (
          <div>
            <h2>Dog Info:</h2>
            <p>
              <b>Name:</b> {dog.name}
            </p>
            <p>
              <b>Age:</b> {dog.age}
            </p>
            <p>
              <b>Species:</b> {dog.breed.english} ({dog.breed.japanese})
            </p>
            {dog.remarks && (
              <p>
                <b>Remarks:</b> {dog.remarks}
              </p>
            )}

            <pre>{JSON.stringify(dog, null, 2)}</pre>
          </div>
        )}

        {err && (
          <div>
            <h2>Error:</h2>
            <p>
              {/* Errorを継承したCustomErrorの場合、サーバ → クライアントのシリアライズ時にcodeが欠損する */}
              {err.code} - {err.message}
            </p>

            <pre>{JSON.stringify(err, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
