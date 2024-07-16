import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {ScrollRestoration} from "react-router-dom";
import loader from "/preloader.gif";

export default function Root() {
  const [showInitialContent, setShowInitialContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialContent(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showInitialContent) {
    return (
      <div className="flex items-center justify-center flex-col w-full h-screen bg-[#F3ECDA]">
        <img src={loader} alt="" />
        <h1 className="text-4xl font-bold text-slate-900">TakaPay</h1>
      </div>
    );
  }
  return (
    <div className="bg-[#F3ECDA]">
      <ScrollRestoration />
      <Outlet></Outlet>
    </div>
  );
}
