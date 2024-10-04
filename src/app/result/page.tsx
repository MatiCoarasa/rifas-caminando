'use client';

import Header from "../../components/header/Header";
import Success from "../../components/result/Success";
import Failure from "../../components/result/Failure";
import {useSearchParams} from "next/navigation";


export default function StatusPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  let component;
  switch(status) {
    case 'success':
      component = <Success/>;
      break;
    default:
      component = <Failure/>;
  }

  return (
    <div>
    <Header />
      {component}
    </div>
  );
}
