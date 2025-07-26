import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      alert("Análise em progresso!");
    }
  };

  const handleChooseFile = () => {
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Cabeçalho */}
      <h1 className="text-xl font-bold mb-4" aria-label="CV Analisador">
        CV Analisador
      </h1>

      {/* Título principal */}
      <h2 className="text-4xl font-bold mb-4 text-center" aria-label="Pergunta sobre currículo">
        Seu currículo passaria no filtro das empresas?
      </h2>

      {/* Subtítulo */}
      <p className="text-lg text-gray-300 mb-6 text-center">
        Analise seu currículo com nossa ferramenta baseada em critérios de ATS e descubra como melhorar suas chances de conseguir entrevistas.
      </p>

      {/* Seção de upload */}
      <div className="p-6 bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 max-w-md mx-auto text-center">
        {/* Ícone de upload */}
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        
        {/* Texto principal */}
        <p className="text-sm mb-2">
          Envie seu currículo e receba análise instantânea
        </p>
        
        {/* Instruções */}
        <p className="text-xs text-gray-400 mb-4">
          Máximo 10MB • Apenas arquivos PDF • Análise automática
        </p>

        {/* Input de arquivo oculto */}
        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Escolher arquivo PDF"
        />

        {/* Botão Escolher Arquivo */}
        <Button
          onClick={handleChooseFile}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2"
          aria-label="Escolher arquivo PDF"
        >
          Escolher Arquivo
        </Button>
      </div>
    </div>
  );
};