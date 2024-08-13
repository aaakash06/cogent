"use client";
import Prism from "prismjs";
import parse from "html-react-parser";

import { useEffect } from "react";

const ParseHTML = ({ content }: { content: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <div className="text-sm ">{parse(content)}</div>;
};

export default ParseHTML;
