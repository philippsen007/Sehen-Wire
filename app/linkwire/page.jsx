"use client";

import { useState } from 'react';
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LinkWire = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("");
  const [error, setError] = useState("");

  const handleConnect = () => {

    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    const portRegex = /^[0-9]{1,5}$/;

    if (!ipRegex.test(ipAddress)) {
      setError("Endereço IP inválido. Certifique-se de digitar um IP válido.");
      return;
    }

    if (!portRegex.test(port) || parseInt(port) > 65535) {
      setError("Porta inválida. Deve ser um número entre 1 e 65535.");
      return;
    }

    const targetUrl = `http://${ipAddress}:${port}`;
    window.location.href = targetUrl;
  };

  const handleInputChange = (e, setState) => {
    const value = e.target.value.replace(/[^0-9.]/g, ""); 
    setState(value);
    setError(""); 
  };


  return (
    <div className="min-h-screen flex flex-col bg-accent-corfundo text-white">
      <Header />
      {/* Conteúdo Principal */}
      <div className="flex-grow flex items-center justify-center mt-8 bg-gradient-to-b from-accent-corfundo to-black">
        <div className="w-full max-w-md bg-accent-corfundo p-8 rounded-lg shadow-lg shadow-red-600/50">
          <h1 className="text-2xl font-bold text-center mb-4 text-red-800">
            Conectar ao Seu Wire
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Insira o endereço IP e a porta configurados no seu dispositivo para acessar o Wire.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="ip-address" className="block text-gray-300 mb-2">
                Endereço IP
              </label>
              <Input
                type="text"
                id="ip-address"
                placeholder="Ex.: 192.168.1.10"
                value={ipAddress}
                onChange={(e) => handleInputChange(e, setIpAddress)}
                maxLength={15}
                className={`bg-transparent border-0 border-b-2 focus:outline-none w-full text-white ${
                  error.includes("IP") ? "border-red-500" : "border-gray-500"
                }`}
              />
            </div>
            <div>
              <label htmlFor="port" className="block text-gray-300 mb-2">
                Porta
              </label>
              <Input
                type="text"
                id="port"
                placeholder="Ex.: 8080"
                value={port}
                onChange={(e) => handleInputChange(e, setPort)}
                maxLength={5}
                className={`bg-transparent border-0 border-b-2 focus:outline-none w-full text-white ${
                  error.includes("Porta") ? "border-red-500" : "border-gray-500"
                }`}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}

            <Button
              onClick={handleConnect}
              className="w-full bg-red-800 hover:bg-red-600 text-white py-3 rounded transition-all hover:shadow-md hover:shadow-red-600/50"
            >
              Conectar
            </Button>
          </div>

          <p className="text-gray-500 text-sm text-center mt-4">
            Certifique-se de que seu dispositivo esteja ligado e conectado na mesma rede.
          </p>
        </div>
            
      </div>
        <Footer />
    </div>
  );
};

export default LinkWire;