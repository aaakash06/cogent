"use client";
import Prism from "prismjs";
import parse from "html-react-parser";

import { useEffect } from "react";

const ParseHTML = ({ content }: { content: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return parse(content);
};

export default ParseHTML;
