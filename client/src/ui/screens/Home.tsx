import { Header } from "@/ui/containers/Header";
import { Create } from "../actions/Create";
import { Rename } from "../actions/Rename";

export const Home = () => {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <div className="flex flex-col gap-8 grow items-center justify-start">
        <div className="flex justify-center gap-4">
          <Create />
          <Rename />
        </div>
      </div>
    </div>
  );
};
