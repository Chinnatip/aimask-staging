import { useState } from "react";

type Props = {
  text: string;
};

const Pin = ({ text }: Props) => {
  const [showActive, setActive] = useState(false);
  return <button
    className={` ${
      showActive ? "bg-pink-500" : "bg-blue-500"
    }  text-white font-bold py-2 px-4 rounded-full mr-2 mb-3`}
    onClick={() => setActive(!showActive)}
  >
    {text}
  </button>;
};

export default Pin;
