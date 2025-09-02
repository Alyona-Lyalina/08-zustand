"use client";

function Error({ error }: { error: Error }) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}

export default Error;
