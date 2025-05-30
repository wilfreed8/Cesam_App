"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
//import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { modules } from "@/modules";
//import { type } from "os";
//import { useDeviceType } from "../useDeviceType";

export default function DocuFac() {
  const [search, setSearch] = useState("");
  //const [filiere, setFiliere] = useState("");
  //const [semestre, setSemestre] = useState("");
  const filtered = modules.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.ecole.toLowerCase().includes(search.toLowerCase())
  );
  const handleNotification = () => {
    toast("Votre Telechargements est en cours !", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "success",
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div className="p-4 md:p-10 space-y-6 w-screen bg-white">
      <ToastContainer />
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:5xl font-bold">DocuFac</h1>
        <p className="text-gray-600 text-xl">
          Téléchargez vos documents universitaires par module
        </p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
          <Input
            placeholder="Rechercher un module ou un enseignant..."
            className="pl-8 input input-info  focus:outline-0  outline-0"
            list="browsers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <datalist id="browsers">
            {modules.map((mod) => {
              return <option key={mod.id} value={mod.name}></option>;
            })}
          </datalist>
        </div>
      </section>
      {filtered.length == 0 && (
        <p className="alert ">Aucun element trouvée !</p>
      )}
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((mod) => (
          <motion.div
            key={mod.id}
            whileHover={{ scale: 1.02 }}
            className=""
          >
            <Card className=" border-1 border-amber-50  shadow-sm ">
              <CardContent className="p-4 space-y-2 ">
                <h2 className="text-lg font-bold">{mod.name}</h2>
                <div className="flex flex-row gap-10 pt-5">
                  <a
                    href={mod.cours}
                    target="_blank"
                    className=" btn-sm text-blue-600  hover:text-green-500  transition-colors duration-200 font-semibold"
                    onClick={handleNotification}
                  >
                    cours
                  </a>
                  <a
                    href={mod.td_examen}
                    target="_blank"
                    className="  hover:text-green-500 text-blue-600 font-semibold transition-colors duration-200"
                    onClick={handleNotification}
                  >
                    td + Examen
                  </a>
                </div>

                <a
                  href={mod.lien}
                  target="_blank"
                  className="w-full mt-2 btn border-amber border-1 rounded-md text-green-400 bg-white font-bold  hover:text-white hover:bg-green-400 transition-colors duration-200"
                  onClick={handleNotification}
                >
                  Télécharger
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
