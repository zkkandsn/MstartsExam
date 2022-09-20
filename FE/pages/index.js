import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Books from "../Components/Books";
import AddBook from "../Components/AddBook";

export default function Home() {
  return (
    <>
      <div>
        <Books />
        <AddBook />
      </div>
    </>
  );
}
