import React from "react";
import tw from "tailwind-styled-components";

const Input = tw.input`block w-full rounded-md border-0 duration-300 px-2.5 py-1.5 text-base-content outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6`;

export default React.memo(Input);
